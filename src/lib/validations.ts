import { ORGANIZATION_INVITED_MEMBER_ID_PREFIX } from "@/constants/prefix";
import { validUUID } from "@/lib/utils";

export function validInvitedMemberId(invitedMemberId: string) {
  const [prefix, id] = invitedMemberId.split("_");
  if (prefix !== ORGANIZATION_INVITED_MEMBER_ID_PREFIX) {
    return false;
  }
  return validUUID(id);
}