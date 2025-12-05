import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import type { CreateProjectInput } from '@/app/project/project.type';

import { useCreateProjectMutation } from '@/app/project/project.hooks';
import {
  projectNameSchema,
  createProjectSchema,
} from '@/app/project/project.schema';
import { projectQueryKeys } from '@/app/project/projects.keys';
import { Button } from '@/components/site-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleApiErrorException } from '@/lib/utils';

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export function CreateProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const [showSiteUrlField, setShowSiteUrlField] = useState(false);
  const [projectNameValidated, setProjectNameValidated] = useState(false);

  const navigate = useNavigate();

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      siteUrl: '',
    },
  });

  const handleProjectNameValidation = async () => {
    const projectNameValue = form.getValues('name');

    try {
      projectNameSchema.parse({ name: projectNameValue });

      setProjectNameValidated(true);
      setShowSiteUrlField(true);

      form.clearErrors('name');

      setTimeout(() => {
        const siteUrlField = document.querySelector(
          'input[name="siteUrl"]'
        ) as HTMLInputElement;
        siteUrlField?.focus();
      }, 300);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const projectNameError = error.errors.find((err) =>
          err.path.includes('name')
        );
        if (projectNameError) {
          form.setError('name', {
            type: 'manual',
            message: projectNameError.message,
          });
        }
      }
    }
  };

  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useCreateProjectMutation();

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();

    const data = form.getValues();

    if (!projectNameValidated) {
      handleProjectNameValidation();
      return;
    }

    try {
      createProjectSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof typeof data;
          form.setError(fieldName, {
            type: 'manual',
            message: err.message,
          });
        });
      }
      return;
    }

    form.clearErrors();

    createProject(data, {
      onSuccess: async (result) => {
        toast.success('Project created successfully');
        form.reset();
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projectList(),
        });

        onSuccess?.();

        navigate(`/${result.data.data.id}`);
      },
      onError: (error) => {
        handleApiErrorException(error, true);
        if (error instanceof AxiosError) {
          const errorResponse = error.response?.data;
          if (errorResponse?.code === 'project-name-already-exists') {
            form.setError('name', {
              message:
                'Project name already exists, please choose another name',
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
      <form onSubmit={handleCreateProject} className="space-y-5">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Project Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`transition-all duration-300 ease-in-out ${
              showSiteUrlField
                ? 'mt-5 max-h-32 translate-y-0 opacity-100'
                : 'max-h-0 -translate-y-2 overflow-hidden opacity-0'
            }`}
          >
            <FormField
              control={form.control}
              name="siteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Site URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full"
          loadingText="Creating Project"
          loading={isPending}
        >
          {showSiteUrlField ? 'Create Project' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
}
