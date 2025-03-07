import { toast } from 'sonner';

import { delay } from '@/lib/utils';

import { projectStore } from './project.store';

export const verifyProjetHandler = async () => {
  const currentNewProject = projectStore.getCurrentNewProject();
  // console.log(currentNewProject);
  await delay(1000);
  toast.success('Project verified ' + currentNewProject?.name);
  projectStore.setCurrentStep(2);
};
