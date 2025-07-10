import { useLayoutEffect } from 'react';
import { redirect, useLoaderData } from 'react-router';

import { authStore } from '@/app/auth/auth.store';
import { useProjectServicesQuery } from '@/app/project/project.hooks';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import FetchErrorView from '@/components/fetch-error-view';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatConnectionView from './_components/chat-connection-view.tsx';
import ChatAssistantPage from './ChatAssistantPage.tsx';

export const loader = createDashboardLoader(async () => {
  const currentProject = authStore.getCurrentProject();
  if (!currentProject) {
    return redirect('/projects');
  }
  await preFetchProjectServices(currentProject.id);
  return {
    projectId: currentProject.id,
  };
});

export function Component() {
  const { projectId } = useLoaderData() as { projectId: string };

  const {
    data: projectServices,
    isLoading: isProjectServicesLoading,
    isFetching: isProjectServicesFetching,
    error: projectServicesError,
    refetch: refetchProjectServices,
  } = useProjectServicesQuery(projectId);

  useLayoutEffect(() => {
    document.documentElement.style.overflowY = 'auto';
  }, []);

  if (
    projectServicesError ||
    !projectServices?.chat_assistant?.chatAssistantId
  ) {
    return (
      <div className="py-20">
        <FetchErrorView
          title="conversations"
          errorActions={{
            primary: {
              label: 'Refresh',
              onClick: refetchProjectServices,
            },
          }}
        />
      </div>
    );
  }

  if (isProjectServicesLoading || isProjectServicesFetching) {
    return <ChatConnectionView />;
  }

  return <ChatAssistantPage />;
}
