import { FolderIcon, Plus } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';

import { useProjectsQuery } from '@/app/project/project.hooks';
import { Button } from '@/components/site-button';
import { InputSearch } from '@/components/ui/search-input';
import { Skeleton } from '@/components/ui/skeleton';

import { ProjectCard } from './project-card';
import { ProjectListSkeleton } from './project-card-skeleton';

export default function Projects() {
  const { data: projectsResult, isLoading, isRefetching } = useProjectsQuery();
  const navigate = useNavigate();

  const projects = useMemo(() => projectsResult ?? [], [projectsResult]);

  useEffect(() => {
    if (projects.length === 0 && !isLoading && !isRefetching) {
      navigate('/create-project');
    }
  }, [projects, isLoading, isRefetching, navigate]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6">
      {isLoading ? (
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <Skeleton className="h-10 w-full sm:max-w-2xl" />
          </div>
          <Skeleton className="h-10 w-full sm:w-[120px]" />
        </div>
      ) : (
        <div className="mb-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full sm:max-w-2xl">
              <InputSearch
                placeholder="Search Projects..."
                className="w-full max-sm:h-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/create-project">
              <Button
                className="w-full gap-2 max-sm:h-9 sm:w-auto"
                icon={<Plus className="size-4" />}
              >
                Add New
              </Button>
            </Link>
          </div>
        </div>
      )}

      {isLoading || isRefetching ? (
        <ProjectListSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full border bg-foreground/10 p-5">
                <FolderIcon className="size-10 text-foreground/60" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No Projects Yet</h3>
                <p className="max-w-[400px] text-muted-foreground">
                  Get started by creating your first project. Projects help you
                  organize and track your work effectively.
                </p>
              </div>
              <Link to="/create-project">
                <Button
                  variant="outline"
                  className="mt-4"
                  icon={<Plus className="size-4" />}
                >
                  Create New Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
