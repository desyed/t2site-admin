import { z } from 'zod';

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
    .url('Enter a valid URL (must start with https://)')
    .min(1, 'Site URL is required'),
});
