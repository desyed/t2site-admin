import { InvitedMember, InvitedMemberResponse } from "./organizaion-type";
import { getInvitedMemberApi, getInvitedMembersApi } from "./organization-api";

export async function fetchInvitedMembers() {
  const result = await getInvitedMembersApi();
  return result?.data?.data?.invitedMembers as InvitedMember[];
}

export async function fetchInvitedMember(invitedMemberId: string) {
  const result = await getInvitedMemberApi(invitedMemberId);
  return result?.data?.data as InvitedMemberResponse;
}


