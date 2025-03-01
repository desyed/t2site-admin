import { ChevronDown, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logDev } from '@/lib/utils';

import { CreateProjectDialog } from './create-project-dialog';

export function ProjectsMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleChangeProject = (index: number) => {
    logDev(index);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="gap-1 px-0 text-sm text-muted-foreground hover:text-foreground hover:no-underline [&_svg]:mt-[3px] [&_svg]:size-4"
          variant="link"
          icon={<ChevronDown className="size-4" />}
          iconPosition="right"
        >
          Default Projects
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>PROJECTS</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <div className="flex  justify-between">
              <Button className="h-2 px-0" variant="ghost">
                Default Projects
              </Button>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  navigate('/settings/project');
                }}
                className="h-5 p-0"
              >
                <Settings />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="site-scrollbar max-h-[calc(100vh-55vh)] overflow-x-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <DropdownMenuItem
                onSelect={() => handleChangeProject(index)}
                key={index}
              >
                Project {index + 1}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <CreateProjectDialog />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
