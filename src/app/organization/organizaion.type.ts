import type { z } from 'zod';

import type { inviteMemberSchema, roles } from './organization.schema';

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type Role = (typeof roles)[number];

export interface Organization {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  role: Role;
}
export interface MemberUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  currentUser: boolean;
}

export interface InvitedMember {
  id: string;
  email: string;
  role: Role;
  name: string;
  organizationId: string;
  invitedBy: MemberUser;
  status: string;
  expiresAt: string;
  createdAt: string;
  optimisticallyUpdatedAt?: string;
}

export interface UpdateInvitationPayload {
  organizationId?: string;
  invitedMemberId: string;
}

export interface InvitedMemberResponse extends InvitedMember {
  organization: Organization;
}

export interface OrganizationMember {
  id: string;
  email: string;
  role: Role;
  user: MemberUser;
  currentUser: boolean;
  organizationId: string;
  createdAt: string;
}

export type MemberActionPayload<T = unknown> = {
  memberId: string;
  organizationId?: string;
  payload?: T;
};
