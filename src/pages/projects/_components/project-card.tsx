import { Clock, Ellipsis, Globe2Icon, Home, SettingsIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import type { Project } from '@/app/project/project.type';

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dayJs } from '@/lib/time';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      key={project.id}
      className="group relative overflow-hidden transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-4 p-4">
        <Link
          to={`/projects/${project.id}?redirect_to=/dashboard`}
          className="shrink-0"
        >
          <Avatar className="size-8 rounded-md bg-muted shadow-sm">
            <AvatarImage src={project.icon ?? undefined} alt={project.name} />
            <AvatarFallback className="text-lg">
              {project.name[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-4">
            <Link
              to={`/projects/${project.id}?redirect_to=/dashboard`}
              className="hover:underline"
            >
              <h2 className="max-w-[200px] truncate font-semibold tracking-tight">
                {project.name}
              </h2>
            </Link>
            <time
              className="shrink-0 text-xs text-muted-foreground"
              dateTime={project.createdAt}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="size-3" />
                {dayJs(project.createdAt).fromNow()}
              </div>
            </time>
          </div>
          <div className="flex">
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:underline"
            >
              <Globe2Icon className="size-3.5" />
              <span className="truncate">{project.siteUrl}</span>
            </a>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 ">
              <Ellipsis className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onSelect={() =>
                navigate(`/projects/${project.id}?redirect_to=/dashboard`)
              }
              className="gap-2"
            >
              <Home className="size-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                navigate(
                  `/projects/${project.id}?redirect_to=/settings/project`
                )
              }
              className="gap-2"
            >
              <SettingsIcon className="size-4" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
