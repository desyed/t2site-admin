import { z } from "zod";

export const MAX_MEMBERS = 10;
export const roles = ["member", "admin", "owner"] as const;
export type Role = typeof roles[number];

export const inviteMemberSchema = z.object({
  members: z
    .array(
      z.object({
        email: z.string().email({ message: "Invalid email address" }),
        name: z.string().optional(),
        role: z.enum(roles),
      })
    )
    .max(MAX_MEMBERS, `You can invite up to ${MAX_MEMBERS} members at once`),
  message: z.string().optional(),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
