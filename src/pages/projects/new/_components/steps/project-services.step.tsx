import type { TServiceType } from '@/app/project/project.type';

import ServiceToggle from '@/components/service-toggle';
import { Card } from '@/components/ui/card';
import { navServices } from '@/layouts/dashboard/dashboard-sidebard';

export default function ProjectServicesStep() {
  const handleChangeService = () => {};
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Services</h2>
        <p className="text-sm text-muted-foreground">
          Select the services you want to enable for your website
        </p>
      </div>

      <Card className="w-full max-w-full divide-y">
        {[].map((service) => (
          <ServiceToggle
            key={service.id}
            title={service.name}
            description={service.description}
            Icon={navServices['chat_assistant'].icon}
            checked={services[service.id as keyof typeof services].checked}
            onCheckedChange={(checked) => {
              handleChangeService(service.id as TServiceType, checked);
            }}
            features={service.features as unknown as string[]}
          />
        ))}
      </Card>
    </div>
  );
}
