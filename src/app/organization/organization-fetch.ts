import { InvitedMember } from "./organizaion-type";
import { getInvitedMembersApi } from "./organization-api";

export async function fetchInvitedMembers() {
  const result = await getInvitedMembersApi();
  return result?.data?.data?.invitedMembers as InvitedMember[];
}