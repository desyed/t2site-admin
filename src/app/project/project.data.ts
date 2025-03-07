import { CheckCircle, Code2, Server, Settings } from 'lucide-react';

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
    check: true,
    coninueHandler: () => {
      console.log('continue');
    },
  },
  {
    name: 'Services',
    icon: Settings,
    type: 'services',
    completed: false,
    back: true,
    skip: true,
    continue: false,
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
