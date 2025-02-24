import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useInviteMembersMutaion } from "@/app/organization/organization-hooks";
import { inviteMemberSchema, MAX_MEMBERS, roles } from "@/app/organization/organization-schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSmoothScroll, useCallWithScroll } from "@/hooks/use-scroll";
import { delay, handleApiErrorException } from "@/lib/utils";
import { toast } from "sonner";
import { InviteMemberInput } from "@/app/organization/organizaion-type";
import { invitedMemberQueryKeys } from "@/app/organization/organization-keys";


interface InviteMemberFormProps {
  onClose: () => void;
}

export function InviteMemberForm({ onClose }: InviteMemberFormProps) {

  const [scrollContainerRef, smoothScrollToBottom] = useSmoothScroll<HTMLDivElement>();

  const form = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      members: [{ email: "", name: undefined, role: "member" }],
      message: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const handleAppend = useCallWithScroll(() => append({ email: "", name: "", role: "member" }), smoothScrollToBottom);

  const [membersError, setMembersError] = useState<any>(null);

  const queryClient = useQueryClient();


  const { mutate, isPending } = useInviteMembersMutaion();

  const handleSubmitInvitation = async (values: InviteMemberInput) => {
    mutate(values, {
      onSuccess: async () => {
        toast.success("🎉 Invitation Sent Successfully!", {
          description: "Your team members will receive an email invitation to join your organization. 📧",
        });
        await delay(200)
        queryClient.invalidateQueries({ queryKey: invitedMemberQueryKeys.invitedMemberList() });
        onClose();
      },
      onError: (error) => {
        handleApiErrorException(error, true);
        if (error instanceof AxiosError) {
          const code = error.response?.data.code;
          if (code === "members-already-exist") {
            const membersError: any = {};
            error.response?.data.membersError?.members?.forEach((member: any) => {
              membersError[member.email] = error.response?.data.membersError?.message;
            });
            setMembersError(membersError);
          }
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitInvitation)} className="space-y-4">
        <div ref={scrollContainerRef} className="site-scrollbar max-h-[60vh] overflow-y-auto overflow-x-hidden px-5 pb-2">
          <div className="flex  max-sm:hidden">
            <div className="grid flex-1 grid-cols-1 gap-3 px-1 sm:grid-cols-2">
              <span className="px-1">Email address</span>
              <div className="grid flex-1 grid-cols-2 gap-3 font-semibold">
                <span className="px-1">Name <span className="text-sm text-muted-foreground">(optional)</span></span>
                <span className="px-1">Role</span>
              </div>
            </div>
            {fields.length > 1 && <div className="w-10"></div>}
          </div>
          <div className="space-y-6 sm:space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-3 sm:flex-row sm:gap-1">
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2" >
                  <FormField
                    control={form.control}
                    name={`members.${index}.email`}
                    render={({ field }) => (
                      <FormItem id={`members.${field.value}`}>
                        <span className="px-1 sm:hidden">Email address</span>
                        <FormControl>
                          <Input placeholder="ryan@example.com" {...field} />
                        </FormControl>
                        <FormMessage>{membersError?.[field?.value]}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <div className="grid flex-1 grid-cols-1 items-start gap-3 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`members.${index}.name`}
                      render={({ field }) => (
                        <FormItem >
                          <span className="px-1 sm:hidden">Name <span className="text-sm text-muted-foreground ">(optional)</span></span>
                          <FormControl>
                            <Input placeholder="Ryan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`members.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <span className="px-1 sm:hidden">Role</span>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role} value={role} className="capitalize">
                                    {role.slice(0, 1).toUpperCase() + role.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {fields.length > 1 && (
                  <div className="sm:mt-1.5">
                    <Button onClick={() => remove(index)} size="icon" variant="ghost" className="border-dashed border-destructive/15 text-destructive/80 hover:bg-destructive/15 hover:text-destructive/80 max-sm:w-full max-sm:border">
                      <Trash2 className="size-4" />
                      <span className="sr-only">Remove member</span>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5">
            {fields.length < MAX_MEMBERS ? (
              <Button type="button" effect="none" variant="outline" className="w-full" onClick={handleAppend}>
                <Plus className="mr-2 size-4" />
                Add email address
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Maximum number of {MAX_MEMBERS} members reached
              </p>
            )}
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <span className="px-1">
                    Message <span className="text-sm text-muted-foreground">(optional)</span>
                  </span>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your teammates why you're inviting them"
                      className="resize-none text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-end gap-4 p-5 pt-0 sm:flex-row">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending} className="w-[180px]">
            {isPending ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" />
                Sending Invitation...
              </>
            ) : (
              "Invite Team Members"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
