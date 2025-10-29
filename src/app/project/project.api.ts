import { api } from '@/lib/api';

import type { CreateProjectInput } from './project.type';

export async function getProjectsApi() {
  return api.get('/projects');
}

export async function getProjectApi({ projectId }: { projectId: string }) {
  return api.get(`/projects/${projectId}`, {});
}

export async function createProjectApi({
  payload,
}: {
  payload: CreateProjectInput;
}) {
  return api.post('/projects', payload);
}
