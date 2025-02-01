
 export const invitedMemberQueryKeys = {
  all: ["INVITED_MEMBERS"],
  invitedMemberList:()=> [...invitedMemberQueryKeys.all, "LIST"],
  invitedMemberByFilter: (filter: object) => [...invitedMemberQueryKeys.invitedMemberList(), filter],
  invitedMemberById: (id: string) => [...invitedMemberQueryKeys.all, id],
  invitedMemberDetails: (id: string) => ["INVITED_MEMBER", id],
}


export const memberQueryKeys = {
  all: ["MEMBERS"],
  invitedMemberList: ()=> [...memberQueryKeys.all, "LIST"],
  invitedMemberByFilter: (filter: object) => [...memberQueryKeys.invitedMemberList(), filter],
  invitedMemberById: (id: string) => [...memberQueryKeys.all, id],
  invitedMemberDetails: (id: string) => ["MEMBER", id],
}