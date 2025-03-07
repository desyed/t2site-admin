import { AlertCircle, RefreshCcw } from 'lucide-react';

import type { TServiceType } from '@/app/project/project.type';

import {
  useProjectServicesQuery,
  useOptimisticProjectServiceUpdateMutation,
} from '@/app/project/project.hooks';
import { useProjectStore } from '@/app/project/project.store';
import ServiceToggle from '@/components/service-toggle';
import { ServiceToggleSkeleton } from '@/components/service-toggle-skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { navServices } from '@/layouts/dashboard/dashboard-sidebard';

export default function ProjectServicesStep() {
  const currentNewProject = useProjectStore((state) => state.currentNewProject);

  const {
    data: services,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useProjectServicesQuery(currentNewProject?.id);

  const { mutate: updateProjectService } =
    useOptimisticProjectServiceUpdateMutation();

  const handleChangeService = (serviceId: TServiceType, checked: boolean) => {
    updateProjectService({
      projectId: currentNewProject?.id as string,
      serviceId,
      active: checked,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Services</h2>
        <p className="text-sm text-muted-foreground">
          Select the services you want to enable for your website
        </p>
      </div>

      <Card className="w-full max-w-full border ">
        {error ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="size-6 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold tracking-tight">
                Failed to load services
              </h3>
              <p className="max-w-[300px] text-sm text-muted-foreground">
                We couldn&apos;t load the services. This might be a temporary
                issue.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="gap-2"
            >
              <RefreshCcw className="size-3.5" />
              Try again
            </Button>
          </div>
        ) : isLoading || isRefetching ? (
          <div className="divide-y">
            {Array.from({ length: 4 }).map((_, index) => (
              <ServiceToggleSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {Object.values(services ?? {}).map((service) => {
              if (!service) return null;
              return (
                <ServiceToggle
                  key={service.id}
                  title={service.name}
                  description={service.description}
                  Icon={navServices[service.id as TServiceType].icon}
                  checked={service.active}
                  onCheckedChange={(checked) => {
                    handleChangeService(service.id as TServiceType, checked);
                  }}
                  features={service.features as unknown as string[]}
                />
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
