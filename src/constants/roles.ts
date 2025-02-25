export const roles = {
  owner: 1,
  admin: 2,
  member: 3,
} as const;

export type Role = (typeof roles)[keyof typeof roles];
export type RoleName = keyof typeof roles;
