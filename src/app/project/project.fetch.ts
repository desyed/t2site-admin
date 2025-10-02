import type { Project } from './project.type';

import { getProjectApi, getProjectsApi } from './project.api';

export async function fetchProjects() {
  const response = await getProjectsApi({});
  return response.data?.data as Project[];
}

export async function fetchProject(projectId: string) {
  const response = await getProjectApi({ projectId });
  return response.data?.data as Project;
}
