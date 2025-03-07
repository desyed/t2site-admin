import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useProjectsQuery } from '@/app/project/project.hooks';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { ProjectLabelSkeleton } from './project-label-skeleton';
import ProjectPopupItem from './project-popup-item';

export default function ProjectPopupContent({
  closePopover,
}: {
  closePopover: () => void;
}) {
  const { data: projectsResult, isFetching, isLoading } = useProjectsQuery();

  const projects = projectsResult ?? [];
  const loading = isFetching || isLoading;

  const navigate = useNavigate();
  return (
    <Command className="z- rounded-lg border shadow-md md:min-w-[250px]">
      <CommandInput className="h-8" placeholder="Find Project..." />
      <CommandList>
        {projects.length > 0 && <CommandEmpty>No projects found.</CommandEmpty>}

        <CommandGroup className="site-scrollbar max-h-[255px] min-h-[100px] overflow-y-auto">
          {loading ? (
            // Show 3 skeleton items while loading
            Array.from({ length: 3 }).map((_, index) => (
              <CommandItem
                key={`skeleton-${index}`}
                className="my-1 cursor-default"
              >
                <ProjectLabelSkeleton
                  titleTruncateLimit={150}
                  siteTruncateLimit={160}
                />
              </CommandItem>
            ))
          ) : projects.length === 0 ? (
            <CommandItem
              className="flex min-h-40 flex-col items-center justify-center gap-0"
              disabled
            >
              <h3 className="text-base font-semibold">No projects, yet!</h3>
              <span className="text-sm text-muted-foreground">
                This organization has no projects.
              </span>
            </CommandItem>
          ) : (
            <>
              {projects.map((project) => {
                return (
                  <ProjectPopupItem
                    key={project.id}
                    project={project}
                    closePopover={closePopover}
                  />
                );
              })}
            </>
          )}
        </CommandGroup>
        <CommandSeparator />
        <div className="m-1 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-full"
            onClick={() => {
              navigate('/projects/new');
            }}
          >
            <Plus />
            New Project
          </Button>
        </div>
      </CommandList>
    </Command>
  );
}
