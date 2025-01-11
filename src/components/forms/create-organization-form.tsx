import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

import * as z from 'zod';
import { createOrganizationMutation } from '@/app/organization/organizationApi';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/app/auth/authStore';
import { handleServerErrors } from '@/lib/error';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
});

export type CreateOrganizationFormData = z.infer<
  typeof createOrganizationSchema
>;

export function CreateOrganizationForm({ onClose }: { onClose: () => void }) {
  const form = useForm<CreateOrganizationFormData>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
    },
  });
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const { loading, executeMutation } = useApi<{
    access_token: string;
    organizationId: string;
  }>(createOrganizationMutation, {
    toast: true,
  });

  const handleSubmit = async (values: CreateOrganizationFormData) => {
    try {
      const result = await executeMutation(values);
      if (result.errors) {
        return handleServerErrors(form, result.errors);
      }
      if (result.data?.access_token && result.data?.organizationId) {
        setAccessToken(result.data.access_token);
        toast.success("Organization created successfully!", {
          description: "You can now start building your organization.",
          position: "top-center",
          duration: 3000,
        });
        navigate('/auth?auth_login=success&ocr=true')
        onClose();
      }else {
        toast.error("Failed to create organization!", {
          description: "Please try again.",
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Organization'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
