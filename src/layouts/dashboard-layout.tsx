import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

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

  return (
    <RealtimeProvider>
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
