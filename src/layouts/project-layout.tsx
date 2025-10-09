import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import { DashboardContentAreaSkeleton } from '@/components/dashboard/dashboard-content-area-skeleton';
import { ProfileCompletionFloat } from '@/components/dashboard/profile-completion-float';
import { ProjectNavigationBar } from '@/components/dashboard/project-navigation-bar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { SidebarSkeleton } from '@/components/dashboard/sidebar-skeleton';
import ErrorScreen from '@/components/ErrorScreen';
import RealtimeProvider from '@/components/realtime-provider';
import { useAuth } from '@/contexts/auth-provider';

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
      <div className="relative flex size-full h-screen">
        <div
          className={`top-0 z-50 flex h-full bg-sidebar transition-all duration-1000 max-md:fixed ${isMobileNavOpened ? 'left-0' : '-left-full'}`}
        >
          <ProjectNavigationBar projectId={params.projectId ?? ''} />
          <div className="py-2 pr-2">
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
          className={`-100 relative w-full bg-sidebar md:py-2 ${isMobileNavOpened && 'blur-sm'} h-full overflow-y-auto transition-all duration-1000`}
        >
          {/* Transparent Overlay for preventing background click */}
          <div
            className={`absolute left-0 top-0 z-10 size-full ${isMobileNavOpened ? 'block' : 'hidden'}`}
            onClick={closeMobileNav}
          />
          <div className="size-full min-h-fit bg-white pb-10 md:rounded-l-xl">
            {isProjectLoading ? (
              <DashboardContentAreaSkeleton />
            ) : (
              <Outlet context={[toggleMobileNav]} />
            )}
          </div>

          <ProfileCompletionFloat />
        </main>
      </div>
    </RealtimeProvider>
  );
}
