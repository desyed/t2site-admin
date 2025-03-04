import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import type { Project } from '@/app/project/project.type';

import { projects } from '@/app/project/project.mock';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import ProjectLabel from '../project-label';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function ProjectPopup() {
  const { open: sideBarOpen, isMobile } = useSidebar();
  const [collapsedState, setCollapsedState] = useState(sideBarOpen);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  const handleProjectChange = (project: Project) => {
    setSelectedProject(project);
    setOpen(false);
    navigate(`/`);
  };

  useEffect(() => {
    setCollapsedState(!sideBarOpen && !isMobile);
  }, [sideBarOpen, isMobile]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn('w-full items-center justify-between px-2', {
            '!justify-center': collapsedState,
          })}
        >
          <div className="flex items-center gap-2">
            <ProjectLabel
              collapsed={collapsedState}
              project={selectedProject}
            />
          </div>
          {!collapsedState ? (
            <ChevronsUpDown className="ml-auto size-4 opacity-70" />
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Command className="rounded-lg border shadow-md md:min-w-[250px]">
          <CommandInput className="h-8" placeholder="Find Project..." />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup className="site-scrollbar max-h-[250px] overflow-y-auto">
              {projects.length === 0 && (
                <CommandItem className="flex flex-col gap-0" disabled>
                  <h3 className="text-base font-semibold">No projects, yet!</h3>
                  <span className="text-sm text-muted-foreground">
                    This organization has no projects.
                  </span>
                </CommandItem>
              )}
              {projects.length > 0 && (
                <>
                  {projects.map((project) => {
                    const isSelected = selectedProject.id === project.id;
                    return (
                      <CommandItem
                        key={project.id}
                        onSelect={() => {
                          handleProjectChange(project);
                        }}
                        className="cursor-pointer"
                      >
                        <ProjectLabel
                          titleTruncateLimit={150}
                          siteTruncateLimit={160}
                          project={project}
                        />
                        {isSelected && (
                          <Check className="ml-auto size-4 text-primary" />
                        )}
                      </CommandItem>
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
                  setOpen(false);
                  navigate('/new-project');
                }}
              >
                <Plus />
                New Project
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
