import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { ProfileCompletionFloat } from '@/components/dashboard/profile-completion-float';
import { ProjectNavigationBar } from '@/components/dashboard/project-navigation-bar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useAuth } from '@/contexts/auth-provider';

export default function ProjectLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const params = useParams();

  return (
    <div className="relative flex size-full bg-sidebar">
      <div className="sticky top-0 flex h-screen">
        <ProjectNavigationBar />
        <div className="py-2 pr-2">
          <Sidebar projectId={params.projectId ?? ''} />
        </div>
      </div>

      <main className="relative w-full py-2">
        <div className="h-fit w-full rounded-l-xl bg-white pb-10">
          <Outlet />
        </div>
      </main>
      <ProfileCompletionFloat />
    </div>
  );
}
