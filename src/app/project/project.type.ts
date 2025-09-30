import type { LucideIcon } from 'lucide-react';
import type { z } from 'zod';

import type { Role } from '../project-member/project-member.type';
import type { createProjectSchema } from './project.schema';

export type TServiceType =
  | 'chat_assistant'
  | 'cookie_consent'
  | 'web_analytics';

export type TService = {
  id: TServiceType;
  name: string;
  description: string;
  chatAssistantId: string | null | undefined;
  active: boolean;
  features: string[];
};

export type ProjectService = {
  [key in TServiceType]: TService;
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
  createdAt: string;
};

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type TCreateProjectStep = {
  name: string;
  icon: LucideIcon;
  completed?: boolean;
  back?: boolean;
  skip?: boolean;
  continue?: boolean;
  verify?: boolean;
  noController?: boolean;
  continueLabel?: string;
  continueHandler?: () => Promise<void>;
  continueIcon?: LucideIcon;
};

export type ServiceStatus = 'active' | 'inactive';
