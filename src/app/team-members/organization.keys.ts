export const invitedMemberQueryKeys = {
  all: ['INVITED_MEMBERS'],
  invitedMemberList: (projectId: string) => [
    ...invitedMemberQueryKeys.all,
    'LIST',
    projectId,
  ],
  invitedMemberByFilter: (filter: object, projectId: string) => [
    ...invitedMemberQueryKeys.invitedMemberList(projectId),
    filter,
  ],
  invitedMemberById: (id: string, projectId: string) => [
    ...invitedMemberQueryKeys.all,
    id,
    projectId,
  ],
  invitedMemberDetails: (id: string, projectId: string) => [
    'INVITED_MEMBER',
    id,
    projectId,
  ],
};

export const memberQueryKeys = {
  all: ['MEMBERS'],
  memberList: (projectId: string) => [
    ...memberQueryKeys.all,
    'LIST',
    projectId,
  ],
  memberByFilter: (filter: object, projectId: string) => [
    ...memberQueryKeys.memberList(projectId),
    filter,
  ],
  memberById: (id: string, projectId: string) => [
    ...memberQueryKeys.all,
    id,
    projectId,
  ],
  memberDetails: (id: string, projectId: string) => ['MEMBER', id, projectId],
};
