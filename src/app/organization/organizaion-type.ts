import { z } from "zod";
import { inviteMemberSchema, roles } from "./organization-schema";

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type Role = typeof roles[number];

export interface Organization {
  id: string,
  name: string,
  slug: string | null,
  logo: string | null
}

export interface InvitedBy {
  id: string,
  name: string,
  email: string,
  avatar: string | null
}

export interface InvitedMember {
  id: string,
  email: string,
  role: Role,
  name: string,
  organizationId: string,
  invitedBy: InvitedBy,
  status: string,
  expiresAt: string,
  createdAt: string
}

export interface UpdateInvitationPayload {
  organizationId?: string;
  memberId: string;
}

export interface InvitedMemberResponse extends InvitedMember {
  organization: Organization;
}


