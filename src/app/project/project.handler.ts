import { toast } from 'sonner';

import { delay } from '@/lib/utils';

import { projectStore } from './project.store';

export const verifyProjectHandler = async () => {
  const currentNewProject = projectStore.getCurrentNewProject();
  await delay(1000);
  toast.success('Project verified ' + currentNewProject?.name);
};
