import {
  CheckCircle,
  Code2,
  SearchCheck,
  Server,
  Settings,
} from 'lucide-react';

import { verifyProjetHandler } from './projen.handler';

export const initialCreateProjectStep = [
  {
    name: 'Create',
    icon: Code2,
    type: 'create',
    noController: true,
  },
  {
    name: 'Verify',
    icon: Server,
    completed: false,
    back: false,
    skip: true,
    continue: true,
    continueLabel: 'Verify Project',
    continueIcon: SearchCheck,
    check: true,
    continueHandler: verifyProjetHandler,
  },
  {
    name: 'Services',
    icon: Settings,
    type: 'services',
    completed: false,
    back: true,
    skip: false,
    continue: true,
  },
  {
    name: 'Complete',
    icon: CheckCircle,
    type: 'complete',
    completed: true,
    back: true,
    skip: false,
    continue: false,
  },
] as const;
