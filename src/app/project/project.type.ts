import type { LucideIcon } from 'lucide-react';
import type { z } from 'zod';

import type { createProjectSchema } from './project.schema';

export type TServiceType =
  | 'chat_assistant'
  | 'cookie_consent'
  | 'web_analytics';

export type TService = {
  id: TServiceType;
  name: string;
  description: string;
  active: boolean;
  features: string[];
};

export type Project = {
  id: string;
  organizationId: string;
  name: string;
  siteUrl: string;
  icon: string | null;
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
  continueHandler?: () => void;
};

export type ServiceStatus = 'active' | 'inactive';
