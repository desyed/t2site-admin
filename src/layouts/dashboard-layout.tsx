import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/app/auth/auth.store';
import { useProjectServicesQuery } from '@/app/project/project.hooks';
import RealtimeProvider from '@/components/realtime';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/auth-provider';
import DashBoardContent from '@/layouts/dashboard/dashboard-content';
import DashBoardSidebar from '@/layouts/dashboard/dashboard-sidebard';

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { currentProject } = useAuthStore();
  const {
    data: projectServices,
    isLoading,
    isFetching,
  } = useProjectServicesQuery(currentProject?.id as string);

  if (isLoading || isFetching) {
    return null;
  }

  if (!projectServices?.chat_assistant.chatAssistantId) {
    return null;
  }

  return (
    <RealtimeProvider
      chatAssistantId={projectServices?.chat_assistant.chatAssistantId}
    >
      <SidebarProvider>
        <DashBoardSidebar>
          <DashBoardContent>
            <Outlet />
          </DashBoardContent>
        </DashBoardSidebar>
      </SidebarProvider>
    </RealtimeProvider>
  );
}
