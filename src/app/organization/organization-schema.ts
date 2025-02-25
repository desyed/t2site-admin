import { z } from 'zod';

export const MAX_MEMBERS = 10;
export const roles = ['member', 'admin', 'owner'] as const;

export const rolesOptionForMember = ['member'] as const;
export const rolesOptionForAdmin = ['member', 'admin'] as const;
export const rolesOptionForOwner = ['member', 'admin', 'owner'] as const;

export const rolesOptions = {
  member: rolesOptionForMember,
  admin: rolesOptionForAdmin,
  owner: rolesOptionForOwner,
} as const;

export const inviteMemberSchema = z.object({
  members: z
    .array(
      z.object({
        email: z
          .string()
          .min(1, { message: 'Email is required' })
          .email({ message: 'Invalid email address' }),
        name: z.string().optional(),
        role: z.enum(roles),
      })
    )
    .max(MAX_MEMBERS, `You can invite up to ${MAX_MEMBERS} members at once`),
  message: z.string().optional(),
});
