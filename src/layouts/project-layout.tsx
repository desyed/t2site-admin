import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { ProfileCompletionFloat } from '@/components/dashboard/profile-completion-float';
import { ProjectNavigationBar } from '@/components/dashboard/project-navigation-bar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useAuth } from '@/contexts/auth-provider';

export default function ProjectLayout() {
  const { isAuthenticated } = useAuth();
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const params = useParams();

  const toggleMobileNav = () => setIsMobileNavOpened((prev) => !prev);

  const handleOutsideClick = () => {
    if (isMobileNavOpened) {
      setIsMobileNavOpened(false);
    }
  };

  return (
    <div className="relative flex size-full h-screen">
      <div
        className={`top-0 z-50 flex h-full bg-sidebar transition-all duration-1000 max-md:fixed ${isMobileNavOpened ? 'left-0' : '-left-full'}`}
      >
        <ProjectNavigationBar />
        <div className="py-2 pr-2">
          <Sidebar projectId={params.projectId ?? ''} />
        </div>
      </div>

      <main
        className={`-100 relative w-full bg-sidebar md:py-2 ${isMobileNavOpened && 'blur-sm'} h-full overflow-y-auto transition-all duration-1000`}
      >
        {/* Transparent Overlay for preventing background click */}
        <div
          className={`absolute left-0 top-0 z-10 size-full ${isMobileNavOpened ? 'block' : 'hidden'}`}
          onClick={handleOutsideClick}
        />
        <div className="size-full min-h-fit bg-white pb-10 md:rounded-l-xl">
          <Outlet context={[toggleMobileNav]} />
        </div>

        <ProfileCompletionFloat />
      </main>
    </div>
  );
}
