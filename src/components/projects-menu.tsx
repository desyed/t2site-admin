import { ChevronDown, Settings } from 'lucide-react';

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
import { CreateProjectDialog } from './dialogs/create-project-dialog';
import { useNavigate } from 'react-router';
import { useState } from "react";

export function ProjectsMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleChangeProject = (index: number) => {
    console.log(index);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="px-0 text-sm gap-1 [&_svg]:size-4 [&_svg]:mt-[3px] hover:no-underline text-muted-foreground hover:text-foreground"
          variant="link"
        >
          Default Projects <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="w-56">
        <DropdownMenuLabel>PROJECTS</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <div className="flex  justify-between">
              <Button className="px-0 h-2" variant="ghost">
                Default Projects
              </Button>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  navigate('/settings/project');
                }}
               className="p-0 h-5"
              >
                <Settings />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="max-h-[calc(100vh-55vh)] overflow-x-hidden site-scrollbar">
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
