import { Navigate, redirect } from 'react-router';

import { authStore, useAuthStore } from '@/app/auth/auth.store';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import { createDashboardLoader } from '@/middlewares/auth-middleware';
import ServicesSettings from '@/pages/projects/settings/services/_components/services-settings';

export const loader = createDashboardLoader(async () => {
  const currentProject = authStore.getCurrentProject();
  if (!currentProject) {
    return redirect('/projects');
  }
  await preFetchProjectServices(currentProject.id);
});

export function Component() {
  const currentProject = useAuthStore((state) => state.getCurrentProject());

  if (!currentProject) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="max-w-5xl">
      <ServicesSettings currentProjectId={currentProject.id} />
    </div>
  );
}
