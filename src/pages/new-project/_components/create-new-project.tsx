import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronRight,
  Code2,
  Server,
  CheckCircle,
  Settings,
  AlertCircle,
  Globe,
  Link2,
  MessageCircle,
  Cookie,
  ChartLine,
  Loader2,
  Badge,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createProjectScriptTag } from '@/app/project/project.service';
import Alert from '@/components/Alert';
import CopyButton from '@/components/copy-button';
import { ServiceTag } from '@/components/service-tag';
import ServiceToggle from '@/components/service-toggle';
import { Button as SiteButton } from '@/components/site-button';
import SiteCodeBlock from '@/components/site-code-block';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { StepProgress } from './step-progress';

interface ProjectForm {
  name: string;
  siteUrl: string;
}

interface ServiceConfig {
  analytics: boolean;
  chatbot: boolean;
  cookieConsent: boolean;
}

const steps = [
  { title: 'Create Project', icon: Code2 },
  { title: 'Verify Setup', icon: Server },
  { title: 'Choose Services', icon: Settings },
  { title: 'Complete', icon: CheckCircle },
];

const projectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(50, 'Project name must be less than 50 characters'),
  siteUrl: z
    .string()
    .url('Please enter a valid URL')
    .startsWith('https://', {
      message: 'Please enter a valid URL',
    })
    .min(1, 'Site URL is required'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateNewProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: '',
    siteUrl: '',
  });
  const [services, setServices] = useState<ServiceConfig>({
    analytics: false,
    chatbot: false,
    cookieConsent: false,
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      siteUrl: '',
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    setProjectForm(data);
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Create New Project</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Set up a new project to start monitoring and enhancing your
                website
              </p>
            </div>

            <Alert
              type="info"
              title="Website Ownership Verification"
              message="Before proceeding, please ensure you have the necessary permissions to modify the website's code. You'll need access to add scripts to the site's HTML, typically in the <head> section."
            />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-base">
                          <Globe className="size-4" />
                          Project Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormDescription>
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
                        <FormLabel className="flex items-center gap-2 text-base">
                          <Link2 className="size-4" />
                          Site URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          The full URL where you&apos;ll implement our services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Project
                    </>
                  ) : (
                    <>
                      Create Project
                      <ChevronRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Verify Your Site</h2>
              <p className="text-sm text-muted-foreground">
                Add our script to your website to enable our services
              </p>
            </div>

            <div className="space-y-6">
              <Card className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                  <Code2 className="mt-1 size-5 text-primary" />
                  <div className="space-y-1">
                    <p className="font-medium">Add this script to your site</p>
                    <p className="text-sm text-muted-foreground">
                      Copy and paste this code just before the closing
                      &lt;/head&gt; tag
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <SiteCodeBlock
                    code={createProjectScriptTag(projectForm.name)}
                    language="html"
                  />
                </div>
              </Card>

              <Alert
                type="info"
                title="Script Installation"
                message="The script is lightweight ({'<'}5KB) and won't affect your site's performance"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Choose Services</h2>
              <p className="text-sm text-muted-foreground">
                Select the services you want to enable for your website
              </p>
            </div>

            <Card className="w-full max-w-full divide-y">
              <ServiceToggle
                title="Web Analytics"
                description="Track website traffic, user behavior, and performance metrics"
                icon={<ChartLine className="size-4" />}
                checked={services.analytics}
                onCheckedChange={(checked) =>
                  setServices((prev) => ({ ...prev, analytics: checked }))
                }
                features={[
                  'Real-time visitor tracking',
                  'Performance monitoring',
                  'User flow analysis',
                ]}
              />
              <ServiceToggle
                title="Chat Assistant"
                description="AI-powered chat support for your visitors"
                icon={<MessageCircle className="size-4" />}
                checked={services.chatbot}
                onCheckedChange={(checked) =>
                  setServices((prev) => ({ ...prev, chatbot: checked }))
                }
                features={[
                  'Custom AI responses',
                  '24/7 availability',
                  'Multi-language support',
                ]}
              />
              <ServiceToggle
                title="Cookie Consent"
                description="GDPR-compliant cookie consent management"
                icon={<Cookie className="size-4" />}
                checked={services.cookieConsent}
                onCheckedChange={(checked) =>
                  setServices((prev) => ({ ...prev, cookieConsent: checked }))
                }
                features={[
                  'Customizable banner',
                  'Consent logging',
                  'Cookie policy generator',
                ]}
              />
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Setup Complete</h2>
              <p className="text-sm text-muted-foreground">
                Your project has been created successfully. You can modify these
                settings anytime from your dashboard.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{projectForm.name}</h3>
                    <p className="break-all text-sm text-muted-foreground">
                      {projectForm.siteUrl}
                    </p>
                  </div>
                  <Badge className="h-6">New Project</Badge>
                </div>
              </Card>

              <Card className="divide-y">
                <div className="p-6">
                  <h3 className="flex items-center gap-2 font-medium">
                    <Settings className="size-4" />
                    Service Configuration
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You can enable or disable services at any time from your
                    project settings
                  </p>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-medium">Enabled Services</h4>
                    <SiteButton
                      variant="primaryDim"
                      className="h-7 text-xs"
                      onClick={() => setCurrentStep(2)}
                      icon={<Settings className="size-4" />}
                    >
                      Modify Services
                    </SiteButton>
                  </div>

                  {!services.analytics &&
                  !services.chatbot &&
                  !services.cookieConsent ? (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center">
                      <Settings className="size-8 text-muted-foreground/50" />
                      <p className="mt-2 font-medium">No services enabled</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        You can enable services now or later from your dashboard
                      </p>
                      <SiteButton
                        variant="soft"
                        className="mt-4"
                        onClick={() => setCurrentStep(2)}
                        size="sm"
                        icon={<Settings className="size-4" />}
                      >
                        Configure Services
                      </SiteButton>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {services.analytics && <ServiceTag type="analytics" />}
                        {services.chatbot && <ServiceTag type="chatbot" />}
                        {services.cookieConsent && (
                          <ServiceTag type="cookieConsent" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can configure individual service settings in your
                        project dashboard
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="bg-primary/5 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-1 size-5 text-primary" />
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Next Steps</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Complete these steps to finish setting up your project
                      </p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Code2 className="size-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Install tracking script</p>
                          <p className="text-muted-foreground">
                            Add our script to your website&apos;s HTML
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Settings className="size-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Configure services</p>
                          <p className="text-muted-foreground">
                            Customize enabled services in your dashboard
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          <ChartLine className="size-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Monitor your site</p>
                          <p className="text-muted-foreground">
                            View analytics and manage services
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-xl px-4 max-md:mt-4 md:px-0">
      <div className="mb-12">
        <StepProgress currentStep={currentStep} />
      </div>
      <Card className="w-full max-md:border-none md:p-6">
        {currentStep === 0 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold sm:text-xl">
                Create New Project
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Set up a new project to start monitoring and enhancing your
                website
              </p>
            </div>

            <Alert
              type="info"
              title="Website Ownership Verification"
              message="Before proceeding, please ensure you have the necessary permissions to modify the website's code. You'll need access to add scripts to the site's HTML, typically in the <head> section."
            />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-between pt-2"
              >
                <div className="grid gap-6">
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
                              <Input
                                placeholder="https://example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="flex flex-col gap-1 text-xs sm:text-sm">
                              <span>
                                Enter the full URL of your website where
                                you&apos;ll implement our services
                              </span>
                              <span className="text-muted-foreground/80">
                                • Must start with https:// (e.g.,
                                https://yourwebsite.com)
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="mt-5 w-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Project
                    </>
                  ) : (
                    <>
                      Create Project
                      <ChevronRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <>
            <div className="min-h-[400px]">{renderStep()}</div>

            <div className="mt-6 flex justify-end gap-3">
              {currentStep < steps.length - 1 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                  >
                    Skip
                  </Button>
                  <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                    Continue
                    <ChevronRight className="ml-2 size-4" />
                  </Button>
                </>
              )}
              {currentStep === steps.length - 1 && (
                <Button>
                  Complete Setup
                  <CheckCircle className="ml-2 size-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
