import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import { ProfileCompletionFloat } from '@/components/dashboard/profile-completion-float';
import { ProfileIncompleteAlert } from '@/components/dashboard/profile-incomplete-alert';
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
    <div className="flex h-screen bg-sidebar">
      <ProjectNavigationBar />
      <div className="py-2 pr-2">
        <Sidebar projectId={params.projectId ?? ''} />
      </div>
      <main className="relative flex min-h-full flex-1 flex-col overflow-hidden pt-2">
        <div className="h-full rounded-tl-xl bg-white p-4">
          <ProfileIncompleteAlert />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </main>
      <ProfileCompletionFloat />
    </div>
  );
}
