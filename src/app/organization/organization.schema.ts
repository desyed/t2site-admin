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

export const createProjectSchema = z.object({
  name: z
    .string({
      required_error: 'Project name is required',
      invalid_type_error: 'Project name must be a string',
    })
    .regex(
      /^[\d\sA-Za-z]+$/,
      'Project name can only contain letters, numbers, and spaces'
    )
    .min(1, 'Project name is required')
    .min(3, 'Project name must be at least 3 characters')
    .max(50, 'Project name must be less than 50 characters'),
  siteUrl: z
    .string({
      required_error: 'Site URL is required',
      invalid_type_error: 'Site URL must be a string',
    })
    .url('Please enter a valid URL')
    .min(1, 'Site URL is required'),
});
