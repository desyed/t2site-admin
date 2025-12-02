import { redirect, useLoaderData } from 'react-router';

import { preFetchProjects } from '@/app/project/project.prefetch';
import ErrorScreen from '@/components/ErrorScreen';
import { handleApiErrorException } from '@/lib/utils';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

export const loader = createPrivateLoader(async () => {
  try {
    const projects = await preFetchProjects();
    if (projects.length === 0) {
      return redirect('/create-project');
    } else {
      const firstProject = projects[0];
      if (!firstProject) {
        return redirect('/create-project');
      }
      const redirectTo =
        window.localStorage.getItem('redirect_to') || `${firstProject.id}`;

      setTimeout(() => {
        window.localStorage.removeItem('redirect_to');
      }, 300);

      return redirect(redirectTo);
    }
  } catch (error) {
    handleApiErrorException(error, true);
    return {
      error,
    };
  }
});

export function Component() {
  const { error } = useLoaderData() as { error: unknown };

  return <ErrorScreen error={error} />;
}
