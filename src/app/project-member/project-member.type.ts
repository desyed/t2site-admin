import type { z } from 'zod';

import type { Project } from '../project/project.type';
import type { inviteMemberSchema, roles } from './project-member.schema';

export type InviteMemberInput = z.infer<typeof inviteMemberSchema> & {
  projectId: string;
};
export type Role = (typeof roles)[number];

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
  project: Project;
  invitedBy: MemberUser;
  status: string;
  expiresAt: string;
  createdAt: string;
  optimisticallyUpdatedAt?: string;
}

export interface UpdateInvitationPayload {
  projectId: string;
  invitedMemberId: string;
}

export interface InvitedMemberResponse extends InvitedMember {
  project: Project;
}

export interface ProjectMember {
  id: string;
  email: string;
  role: Role;
  user: MemberUser;
  currentUser: boolean;
  projectId: string;
  createdAt: string;
}

export type MemberActionPayload<T = unknown> = {
  memberId: string;
  projectId: string;
  payload?: T;
};
