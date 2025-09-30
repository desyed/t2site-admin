import type { Project, ProjectService } from './project.type';

import {
  getProjectApi,
  getProjectsApi,
  getProjectServicesApi,
} from './project.api';

export async function fetchProjects() {
  const response = await getProjectsApi({});
  return response.data?.data as Project[];
}

export async function fetchProject(projectId: string) {
  const response = await getProjectApi({ projectId });
  return response.data?.data as Project;
}

export async function fetchProjectServices(projectId: string) {
  const response = await getProjectServicesApi({ projectId });
  return response.data?.data as ProjectService;
}
