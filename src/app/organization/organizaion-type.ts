import { z } from "zod";
import { inviteMemberSchema, roles } from "./organization-schema";

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type Role = typeof roles[number];


export interface InvitedBy {
  id: string,
  name: string,
  email: string
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