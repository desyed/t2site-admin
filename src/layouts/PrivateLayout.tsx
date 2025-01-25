import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthProvider';
import DashBoardContent from '@/layouts/dashboard/DashBoardContent';
import DashBoardSidebar from '@/layouts/dashboard/DashBoardSidebard';

export default function PrivateLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider>
      <DashBoardSidebar>
        <DashBoardContent>
          <Outlet />
        </DashBoardContent>
      </DashBoardSidebar>
    </SidebarProvider>
  );
}
