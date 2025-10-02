import type * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { CreateProjectInput } from '@/app/project/project.type';

import { useCreateProjectMutation } from '@/app/project/project.hooks';
import { createProjectSchema } from '@/app/project/project.schema';
import { projectQueryKeys } from '@/app/project/projects.keys';
import { Button } from '@/components/site-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleApiErrorException } from '@/lib/utils';

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export function CreateProjectForm() {
  const navigate = useNavigate();

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      siteUrl: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useCreateProjectMutation();

  const handleCreateProject = (data: CreateProjectInput) => {
    createProject(data, {
      onSuccess: async (result) => {
        toast.success('Project created successfully');
        form.reset();
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projectList(),
        });
        navigate(`/${result.data.data.id}`);
      },
      onError: (error) => {
        handleApiErrorException(error, true);
        if (error instanceof AxiosError) {
          const errorResponse = error.response?.data;
          if (errorResponse?.code === 'project-name-already-exists') {
            form.setError('name', {
              message:
                'Project name already exists in this organization, please choose another name',
            });
          }
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projectList(),
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateProject)}
        className="space-y-4"
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-gray-500">
                  Project Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-gray-500">
                  Site URL
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full"
          loadingText="Creating Project"
          loading={isPending}
        >
          Create Project
        </Button>
      </form>
    </Form>
  );
}
