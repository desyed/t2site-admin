import { ChevronsUpDown } from 'lucide-react';
import { useState, useEffect, forwardRef } from 'react';
import { Navigate } from 'react-router';

import type { Project } from '@/app/project/project.type';

import { useAuthStore } from '@/app/auth/auth.store';
import ProjectLabel from '@/components/project-label';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const CurrentProjectLabel = forwardRef<
  HTMLButtonElement,
  { handleToggle: () => void }
>(({ handleToggle }, ref) => {
  const { open: sideBarOpen, isMobile } = useSidebar();
  const [collapsedState, setCollapsedState] = useState(sideBarOpen);

  useEffect(() => {
    setCollapsedState(!sideBarOpen && !isMobile);
  }, [sideBarOpen, isMobile]);

  const currentProject = useAuthStore((state) => state.currentProject);

  if (!currentProject) {
    return <Navigate to="/projects" />;
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn('w-full items-center justify-between px-2', {
        '!justify-center': collapsedState,
      })}
      onClick={handleToggle}
    >
      <div className="flex items-center gap-2">
        <ProjectLabel
          collapsed={collapsedState}
          project={currentProject as unknown as Project}
        />
      </div>
      {!collapsedState ? (
        <ChevronsUpDown className="ml-auto size-4 opacity-70" />
      ) : null}
    </Button>
  );
});

CurrentProjectLabel.displayName = 'CurrentProjectLabel';

export default CurrentProjectLabel;
