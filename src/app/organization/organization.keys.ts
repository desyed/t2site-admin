export const invitedMemberQueryKeys = {
  all: ['INVITED_MEMBERS'],
  invitedMemberList: () => [...invitedMemberQueryKeys.all, 'LIST'],
  invitedMemberByFilter: (filter: object) => [
    ...invitedMemberQueryKeys.invitedMemberList(),
    filter,
  ],
  invitedMemberById: (id: string) => [...invitedMemberQueryKeys.all, id],
  invitedMemberDetails: (id: string) => ['INVITED_MEMBER', id],
};

export const memberQueryKeys = {
  all: ['MEMBERS'],
  memberList: () => [...memberQueryKeys.all, 'LIST'],
  memberByFilter: (filter: object) => [...memberQueryKeys.memberList(), filter],
  memberById: (id: string) => [...memberQueryKeys.all, id],
  memberDetails: (id: string) => ['MEMBER', id],
};
