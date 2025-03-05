import type { Project } from './project.type';

import { getProjectsApi } from './project.api';

export async function fetchProjects() {
  const response = await getProjectsApi({});
  return response.data?.data as Project[];
}
