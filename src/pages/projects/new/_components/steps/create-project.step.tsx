import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChevronRight, Globe, Link2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { CreateProjectInput } from '@/app/project/project.type';

import { useCreateProjectMutaion } from '@/app/project/project.hooks';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import { createProjectSchema } from '@/app/project/project.schema';
import { useProjectStore } from '@/app/project/project.store';
import { projectQueryKeys } from '@/app/project/projects.keys';
import Alert from '@/components/Alert';
import { Button as SiteButton } from '@/components/site-button';
import { Form } from '@/components/ui/form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleApiErrorException } from '@/lib/utils';

export default function CreateProjectStep() {
  const [isProjectServiceLoading, setIsProjectServiceLoading] = useState(false);
  const setCurrentStep = useProjectStore((state) => state.setCurrentStep);
  const setCurrentNewProject = useProjectStore(
    (state) => state.setCurrentNewProject
  );

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      siteUrl: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useCreateProjectMutaion();

  const handleCreateProject = (data: CreateProjectInput) => {
    createProject(data, {
      onSuccess: async (result) => {
        toast.success('Project created successfully');
        form.reset();
        setCurrentNewProject(result.data.data);
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projectList(),
        });
        setIsProjectServiceLoading(true);
        await preFetchProjectServices(result.data.data.id);
        setIsProjectServiceLoading(false);
        setCurrentStep(1);
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
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold sm:text-xl">Create New Project</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up a new project to start monitoring and enhancing your website
        </p>
      </div>

      <Alert
        type="info"
        title="Website Ownership Verification"
        message="Before proceeding, please ensure you have the necessary permissions to modify the website's code. You'll need access to add scripts to the site's HTML, typically in the <head> section."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateProject)}
          className="flex flex-col justify-between pt-2"
        >
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="size-4" />
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs sm:text-sm">
                    This name will be used to identify your project in the
                    dashboard
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Link2 className="size-4" />
                    Site URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="flex flex-col gap-1 text-xs sm:text-sm">
                    <span>
                      Enter the full URL of your website where you&apos;ll
                      implement our services
                    </span>
                    <span className="text-muted-foreground/80">
                      • Must start with https:// (e.g., https://yourwebsite.com)
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <SiteButton
            type="submit"
            disabled={isPending || isProjectServiceLoading}
            className="mt-6 w-full"
            loadingText="Creating Project"
            loading={isPending || isProjectServiceLoading}
            icon={<ChevronRight className="ml-2 size-4" />}
          >
            Create Project
          </SiteButton>
        </form>
      </Form>
    </div>
  );
}
