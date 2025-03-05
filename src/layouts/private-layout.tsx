import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/auth-provider';

import PrivateHeader from './private/private-header';

export default function PrivateLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider className="bg-neutral-50 dark:bg-background">
      <div className="flex size-full flex-col">
        <PrivateHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
