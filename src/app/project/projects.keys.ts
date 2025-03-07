import type { TServiceType } from './project.type';

export const projectQueryKeys = {
  all: ['PROJECTS'],
  projectList: () => [...projectQueryKeys.all, 'LIST'],
  projectByFilter: (filter: object) => [
    ...projectQueryKeys.projectList(),
    filter,
  ],
  projectById: (id: string) => [...projectQueryKeys.all, id],
  projectDetails: (id: string) => ['PROJECT', id],
};

export const projectServiceQueryKeys = {
  all: ['PROJECT_SERVICE'],
  projectServiceList: (projectId: string) => [
    ...projectServiceQueryKeys.all,
    projectId,
  ],
  projectServiceById: ({
    projectId,
    serviceId,
  }: {
    projectId: string;
    serviceId: TServiceType;
  }) => [...projectServiceQueryKeys.all, projectId, serviceId],
};
