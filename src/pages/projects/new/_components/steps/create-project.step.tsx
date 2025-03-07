import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Globe, Link2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { CreateProjectInput } from '@/app/project/project.type';

import { useCreateProjectMutaion } from '@/app/project/project.hooks';
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
      onSuccess: (result) => {
        toast.success('Project created successfully');
        form.reset();
        setCurrentStep(1);
        setCurrentNewProject(result.data.data);
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.projectList(),
        });
      },
      onError: (error) => {
        handleApiErrorException(error, true);
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
                  <FormDescription className="text-xs sm:text-sm">
                    This name will be used to identify your project in the
                    dashboard
                  </FormDescription>
                  <FormMessage />
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
                  <FormDescription className="flex flex-col gap-1 text-xs sm:text-sm">
                    <span>
                      Enter the full URL of your website where you&apos;ll
                      implement our services
                    </span>
                    <span className="text-muted-foreground/80">
                      • Must start with https:// (e.g., https://yourwebsite.com)
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SiteButton
            type="submit"
            disabled={isPending}
            className="mt-6 w-full"
            loadingText="Creating Project"
            loading={isPending}
            icon={<ChevronRight className="ml-2 size-4" />}
          >
            Create Project
          </SiteButton>
        </form>
      </Form>
    </div>
  );
}
