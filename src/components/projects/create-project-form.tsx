import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
// import { createProjectMutation } from '@/app/project/projectApi';
// import { useApi } from '@/hooks/use-api';
// import { handleServerErrors } from '@/lib/error';
// import { toast } from "sonner";
// import { useNavigate } from "react-router";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { logDev } from '@/lib/utils';

export const createProjectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().optional(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export function CreateProjectForm() {
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
    },
  });
  // const navigate = useNavigate();
  const [loading] = useState(false);

  // const { loading, executeMutation } = useApi<{
  //   projectId: string;
  // }>(createProjectMutation, {
  //   toast: true,
  // });

  const handleSubmit = async () => {
    try {
      // const result = await executeMutation(values);
      // if (result.errors) {
      //   return handleServerErrors(form, result.errors);
      // }
      // if (result.data?.projectId) {
      //   toast.success("Project created successfully!", {
      //     description: "You can now start working on your project.",
      //     position: "top-center",
      //     duration: 3000,
      //   });
      //   navigate(`/project/${result.data.projectId}`);
      //   onClose();
      // } else {
      //   toast.error("Failed to create project!", {
      //     description: "Please try again.",
      //     position: "top-center",
      //     duration: 3000,
      //   });
      // }
    } catch (error) {
      logDev(error);
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
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Project'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
