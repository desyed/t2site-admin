import type { z } from 'zod';

import type { Role } from '../project-member/project-member.type';
import type { createProjectSchema } from './project.schema';

export type ProjectFeatures = {
  chatAssistant: {
    id: string;
    logo?: string | null | undefined;
    theme?: string | null | undefined;
  };
};

export type Project = {
  id: string;
  name: string;
  siteUrl: string;
  icon: string | null;
  currentUser: {
    memberId: string;
    role: Role;
  };
  features: ProjectFeatures;
  createdAt: string;
};

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
