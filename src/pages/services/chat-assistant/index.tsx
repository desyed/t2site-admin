import { useLayoutEffect } from 'react';
import { redirect, useLoaderData, useParams } from 'react-router';

import {
  useCurrentProjectQuery,
  useProjectServicesQuery,
} from '@/app/project/project.hooks';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import FetchErrorView from '@/components/fetch-error-view';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatConnectionView from './_components/chat-connection-view.tsx';
import ChatAssistantPage from './ChatAssistantPage.tsx';

export const loader = createDashboardLoader(async () => {
  const { projectId } = useParams();
  if (!projectId) {
    return redirect('/');
  }
  await preFetchProjectServices(projectId);
  return {
    projectId: projectId,
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
