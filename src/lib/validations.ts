import {
  PROJECT_ID_PREFIX,
  PROJECT_INVITED_MEMBER_ID_PREFIX,
} from '@/constants/prefix';
import { validUUID } from '@/lib/utils';

export function validInvitedMemberId(invitedMemberId: string) {
  const [prefix, id] = invitedMemberId.split('_');
  if (prefix !== PROJECT_INVITED_MEMBER_ID_PREFIX) {
    return false;
  }
  if (!id) return false;
  return validUUID(id);
}

export function isValidProjectId(projectId: string) {
  const [prefix, id] = projectId.split('_');
  if (prefix !== PROJECT_ID_PREFIX) {
    return false;
  }
  if (!id) return false;
  return validUUID(id);
}
