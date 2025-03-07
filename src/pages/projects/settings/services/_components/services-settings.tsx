import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Navigate } from 'react-router';

import type { TServiceType } from '@/app/project/project.type';

import { useOptimisticProjectServiceUpdateMutation } from '@/app/project/project.hooks';
import { useProjectServicesQuery } from '@/app/project/project.hooks';
import ServiceToggle from '@/components/service-toggle';
import { ServiceToggleSkeleton } from '@/components/service-toggle-skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { navServices } from '@/layouts/dashboard/dashboard-sidebard';

export default function ServicesSettings({
  currentProjectId,
}: {
  currentProjectId: string;
}) {
  const {
    data: services,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useProjectServicesQuery(currentProjectId);

  const { mutate: updateProjectService } =
    useOptimisticProjectServiceUpdateMutation();

  const handleChangeService = (serviceId: TServiceType, checked: boolean) => {
    updateProjectService({
      projectId: currentProjectId,
      serviceId,
      active: checked,
    });
  };

  if (!currentProjectId) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="space-y-6">
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
