import { AlertCircle, ChartLine, Code2, Settings } from 'lucide-react';
import { useMemo } from 'react';

import type { ProjectService } from '@/app/project/project.type';

import { useProjectServicesQuery } from '@/app/project/project.hooks';
import { useProjectStore } from '@/app/project/project.store';
import ProjectLabel from '@/components/project-label';
import { ServiceTag } from '@/components/service-tag';
import { Button, Button as SiteButton } from '@/components/site-button';
import { Card } from '@/components/ui/card';
export default function SetupCompleteStep() {
  const currentNewProject = useProjectStore((state) => state.currentNewProject);
  const setCurrentStep = useProjectStore((state) => state.setCurrentStep);
  const { data: services } = useProjectServicesQuery(currentNewProject?.id);

  const activeProjectSerives = useMemo(() => {
    const activeSerives = [];

    if (services) {
      for (const serviceId in services) {
        const service = services[serviceId as keyof ProjectService];
        if (service.active) {
          activeSerives.push(service);
        }
      }
    }

    return activeSerives;
  }, [services]);

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
        <Card className="p-3">
          {currentNewProject ? (
            <ProjectLabel
              iconClassName="size-8 mr-1"
              labelClassName="text-base"
              siteUrlClassName="text-xs"
              titleTruncateLimit={400}
              siteTruncateLimit={400}
              project={currentNewProject}
            />
          ) : (
            <div className="flex items-center justify-center">
              No project found
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentStep(0);
                }}
              >
                Create Again
              </Button>
            </div>
          )}
        </Card>

        <Card className="divide-y">
          <div className="p-6">
            <h3 className="flex items-center gap-2 font-medium">
              <Settings className="size-4" />
              Service Configuration
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You can enable or disable services at any time from your project
              settings
            </p>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium">Enabled Services</h4>
              <SiteButton
                variant="primaryDim"
                className="h-7 text-xs"
                onClick={() => {
                  setCurrentStep(2);
                }}
                icon={<Settings className="size-4" />}
              >
                Modify Services
              </SiteButton>
            </div>

            {activeProjectSerives.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center">
                <Settings className="size-8 text-muted-foreground/50" />
                <p className="mt-2 font-medium">No services enabled</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can enable services now or later from your dashboard
                </p>
                <SiteButton
                  variant="soft"
                  className="mt-4"
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  size="sm"
                  icon={<Settings className="size-4" />}
                >
                  Configure Services
                </SiteButton>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeProjectSerives.map((service) => (
                    <ServiceTag key={service.id} type={service.id} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  You can configure individual service settings in your project
                  dashboard
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
