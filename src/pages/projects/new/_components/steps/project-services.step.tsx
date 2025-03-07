import { useProjectStore } from '@/app/project/project.store';
import ServicesSettings from '@/pages/projects/settings/services/_components/services-settings';

export default function ProjectServicesStep() {
  const currentNewProject = useProjectStore((state) => state.currentNewProject);

  return (
    <ServicesSettings currentProjectId={currentNewProject?.id as string} />
  );
}
