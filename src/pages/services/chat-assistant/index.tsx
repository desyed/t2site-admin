import { useLayoutEffect } from 'react';
import { Outlet, redirect, useLoaderData, useParams } from 'react-router';

import { authStore } from '@/app/auth/auth.store';
import { useProjectServicesQuery } from '@/app/project/project.hooks';
import { preFetchProjectServices } from '@/app/project/project.prefetch';
import FetchErrorView from '@/components/fetch-error-view';
import { useMediaQuery } from '@/hooks/use-mobile';
import { createDashboardLoader } from '@/middlewares/auth-middleware';

import ChatConnectionView from './_components/chat-connection-view.tsx';
import ChatAssistant from './chat-assistant.tsx';
import ChatRealtimeProvider from './chat-realtime.tsx';

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
  const { ticketId } = useParams();
  const isDesktop = useMediaQuery('(min-width: 768px)');

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

  if (ticketId && !isDesktop) {
    return (
      <div className="h-[calc(100vh-52px)] w-full overflow-hidden bg-background">
        <Outlet />
      </div>
    );
  }

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

  return (
    <ChatRealtimeProvider
      chatAssistantId={projectServices?.chat_assistant?.chatAssistantId}
    >
      <ChatAssistant />
    </ChatRealtimeProvider>
  );
}
