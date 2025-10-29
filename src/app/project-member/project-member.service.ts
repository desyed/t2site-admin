import type { RoleName } from '@/constants/roles';

import { roles } from '@/constants/roles';

export const checkSendInvitationPermission = (
  role: RoleName | null | undefined,
  invitedMemberRole: RoleName | null | undefined
) => {
  if (!role || !invitedMemberRole) {
    return false;
  }
  return roles[role] <= roles[invitedMemberRole];
};

export const checkCancelInvitationPermission = (
  role: RoleName | null | undefined,
  invitedMemberRole: RoleName | null | undefined
) => {
  if (!role || !invitedMemberRole) {
    return false;
  }
  if (role === 'member') {
    return false;
  }
  return roles[role] <= roles[invitedMemberRole];
};

export const isMemberRole = (role: RoleName | null | undefined) => {
  if (!role) {
    return false;
  }
  return role === 'member';
};

export const isOwnerRole = (role: RoleName | null | undefined) => {
  if (!role) {
    return false;
  }
  return role === 'owner';
};

export const isAdminRole = (role: RoleName | null | undefined) => {
  if (!role) {
    return false;
  }
  return role === 'admin';
};

export const checkRemoveMemberPermission = (
  role: RoleName | null | undefined,
  memberRole: RoleName | null | undefined
) => {
  if (!role || !memberRole) {
    return false;
  }
  if (role === 'member') {
    return false;
  }
  if (memberRole === 'owner') {
    return false;
  }
  return roles[role] <= roles[memberRole];
};

export const checkMemberHasPermission = (
  role: RoleName | null | undefined,
  memberRole: RoleName | null | undefined
) => {
  if (!role || !memberRole) {
    return false;
  }
  return roles[role] <= roles[memberRole];
};
