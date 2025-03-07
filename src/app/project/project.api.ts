import { api } from '@/lib/api';

import type { CreateProjectInput } from './project.type';

/**
 * Organization Projects
 * organizationId is optional if not provided, it will use the current * active organization
 * /

/**
 * @GET /projects/?organizationId={organizationId}(optional)
 */
export async function getProjectsApi({
  organizationId,
}: {
  organizationId?: string;
}) {
  return api.get('/projects', {
    params: { organizationId },
  });
}

/**
 * @GET /projects/:id?organizationId={organizationId}(optional)
 */
export async function getProjectApi({
  projectId,
  organizationId,
}: {
  projectId: string;
  organizationId?: string;
}) {
  return api.get(`/projects/${projectId}`, {
    params: { organizationId },
  });
}

/**
 * @POST /projects?organizationId={organizationId}(optional)
 */
export async function createProjectApi({
  payload,
  organizationId,
}: {
  payload: CreateProjectInput;
  organizationId?: string;
}) {
  return api.post('/projects', payload, {
    params: { organizationId },
  });
}

/**
 * @PUT /projects/change-current
 */
export async function changeCurrentProjectApi({
  projectId,
  organizationId,
}: {
  projectId: string;
  organizationId?: string;
}) {
  return api.put(
    `/projects/change-current`,
    {
      projectId,
    },
    {
      params: {
        organizationId,
      },
    }
  );
}
