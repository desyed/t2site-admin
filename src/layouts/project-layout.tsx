import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import { DashboardContentAreaSkeleton } from '@/components/dashboard/dashboard-content-area-skeleton';
import { ProjectNavigationBar } from '@/components/dashboard/project-navigation-bar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { SidebarSkeleton } from '@/components/dashboard/sidebar-skeleton';
import ErrorScreen from '@/components/ErrorScreen';
import RealtimeProvider from '@/components/realtime-provider';
import { useAuth } from '@/contexts/auth-provider';
import { cn } from '@/lib/utils';

export default function ProjectLayout() {
  const { isAuthenticated } = useAuth();
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const { error, refetch, isLoading, isFetching } = useCurrentProjectQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const params = useParams();

  if (params.projectId) {
    window.localStorage.setItem('lastActiveProjectId', params.projectId);
  }

  const toggleMobileNav = () => setIsMobileNavOpened((prev) => !prev);

  const isProjectLoading = isLoading || isFetching;

  const closeMobileNav = () => {
    if (isMobileNavOpened) {
      setIsMobileNavOpened(false);
    }
  };

  if (error) {
    return <ErrorScreen onRetry={refetch} error={error} />;
  }

  return (
    <RealtimeProvider>
      <div
        className={cn(
          'fixed top-0 z-50 flex h-screen w-[var(--sidebar-width)] overflow-hidden bg-sidebar max-md:fixed',
          { 'max-md:left-full': !isMobileNavOpened }
        )}
      >
        <ProjectNavigationBar projectId={params.projectId ?? ''} />
        <div className="md:py-2 md:pr-2">
          {isProjectLoading ? (
            <SidebarSkeleton />
          ) : (
            <Sidebar
              projectId={params.projectId ?? ''}
              onNavItemSelect={closeMobileNav}
            />
          )}
        </div>
      </div>
      <main
        className={cn(
          `relative h-full min-h-screen w-full overflow-y-auto bg-sidebar pl-[var(--sidebar-width)] md:py-2 md:pr-2`,
          {
            'max-md:blur-sm': isMobileNavOpened,
            'max-md:pl-0': !isMobileNavOpened,
          }
        )}
      >
        {/* Transparent Overlay for preventing background click */}
        <div
          className={cn(`absolute left-0 top-0 z-10 size-full`, {
            block: isMobileNavOpened,
            hidden: !isMobileNavOpened,
          })}
          onClick={closeMobileNav}
        />
        <div className="size-full min-h-fit bg-white md:rounded-xl">
          {isProjectLoading ? (
            <DashboardContentAreaSkeleton />
          ) : (
            <Outlet context={[toggleMobileNav]} />
          )}
        </div>
      </main>
    </RealtimeProvider>
  );
}
