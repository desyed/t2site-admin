import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';

import type { Project } from '@/app/project/project.type';

import { useAuthStore } from '@/app/auth/auth.store';

import ProjectLabel from '../project-label';
import { CommandItem } from '../ui/command';

export default function ProjectPopupItem({
  project,
  closePopover,
}: {
  project: Project;
  closePopover: () => void;
}) {
  const currentProject = useAuthStore((state) => state.currentProject);
  const navigate = useNavigate();
  const handleSelectProject = async (project: Project) => {
    navigate(`/projects/${project.id}?redirect_to=${'/'}`);
    closePopover();
  };
  return (
    <CommandItem
      className="cursor-pointer"
      onSelect={() => handleSelectProject(project)}
    >
      <ProjectLabel
        titleTruncateLimit={150}
        siteTruncateLimit={160}
        project={project}
      />
      {currentProject?.id === project.id && (
        <Check className="ml-auto size-4 text-primary" />
      )}
    </CommandItem>
  );
}
