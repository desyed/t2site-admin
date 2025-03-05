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
