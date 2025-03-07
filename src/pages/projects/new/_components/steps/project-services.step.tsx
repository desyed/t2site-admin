import { useProjectStore } from '@/app/project/project.store';
import ServicesSettings from '@/pages/projects/settings/services/_components/services-settings';

export default function ProjectServicesStep() {
  const currentNewProject = useProjectStore((state) => state.currentNewProject);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Choose Services</h2>
        <p className="text-sm text-muted-foreground">
          Select the services you want to enable for your website
        </p>
      </div>
      <ServicesSettings currentProjectId={currentNewProject?.id as string} />
    </div>
  );
}
