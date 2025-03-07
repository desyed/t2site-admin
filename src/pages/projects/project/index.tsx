import { redirect } from 'react-router';
import { toast } from 'sonner';

import { authStore } from '@/app/auth/auth.store';
import { changeCurrentProjectApi } from '@/app/project/project.api';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import { projectStore } from '@/app/project/project.store';
import { handleApiErrorException } from '@/lib/utils';
import { createPrivateLoader } from '@/middlewares/auth-middleware';

export const loader = createPrivateLoader(async ({ request, params }) => {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect_to');

  if (!params.projectId) {
    toast.error('Project not found', {
      description: 'Please select a project from the list',
    });
    return redirect('/projects');
  }

  try {
    const result = await changeCurrentProjectApi({
      projectId: params.projectId,
    });
    if (result?.data?.data && result?.data?.data?.id) {
      await preFetchProjectServices(result?.data?.data?.id);
      authStore.setCurrentProject(result?.data?.data);
      return redirect(redirectTo ?? `/dashboard`);
    }
    toast.error('Failed to change project', {
      description: 'Please try again',
    });
    return redirect('/projects');
  } catch (err) {
    handleApiErrorException(err, true);
    return redirect('/projects');
  }
});

export default function Component() {
  return;
}
