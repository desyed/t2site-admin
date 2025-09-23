import { ProjectSettingsDashboard } from './components/project-settings-dashboard';

interface ProjectSettingsPageProps {
  params?: { projectId: string };
}

export default function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  return (
    <ProjectSettingsDashboard
      projectId={params ? params.projectId : 'project-1'}
    />
  );
}
