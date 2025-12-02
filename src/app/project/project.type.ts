import type { z } from 'zod';

import type { Role } from '../project-member/project-member.type';
import type { createProjectSchema } from './project.schema';

export type ProjectFeatures = {
  liveDesk: {
    id: string;
    cta?: {
      title: string;
      subtitle: string;
      buttonText: string;
      description: string;
    };
    banner?: {
      title: string;
      subtitle: string;
    };
    theme?: {
      primary: string;
      background: string;
      foreground: string;
      primaryForeground: string;
      logoBadgeBackgroundColor: string;
    };
    logo?: string | null | undefined;
    promotionalImage?: string | null | undefined;
    bannerImage?: string | null | undefined;
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
  isRunning?: boolean;
};

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
