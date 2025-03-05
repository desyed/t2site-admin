import { useQuery } from '@tanstack/react-query';

import { fetchProjects } from './project.fetch';
import { projectQueryKeys } from './projects.keys';

export function useProjectsQuery() {
  const query = useQuery({
    queryKey: [projectQueryKeys.projectList()],
    queryFn: () => fetchProjects(),
  });
  return query;
}
