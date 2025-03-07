import { create } from 'zustand';

import type { ServiceStatus, TServiceType } from '@/app/project/project.type';

import type { Project, TCreateProjectStep } from './project.type';

import { initialCreateProjectStep } from './project.data';

export type ServicePayload = {
  id: TServiceType;
  status: ServiceStatus;
};

export type ProjectStore = {
  projects: Project[];
  currentProject: Project | null;
  currentNewProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (currentProject: Project | null) => void;
  setCurrentNewProject: (currentNewProject: Project | null) => void;
  servicesPayload: ServicePayload[];
  createProjectSteps: TCreateProjectStep[];
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  getCurrentStep: () => TCreateProjectStep;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  servicesPayload: [],
  currentNewProject: null,
  createProjectSteps: [...initialCreateProjectStep],
  currentStep: 0,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),
  setCurrentNewProject: (currentNewProject) => set({ currentNewProject }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  getCurrentStep: () => {
    return get().createProjectSteps[get().currentStep];
  },
}));

export const projectStore = useProjectStore.getState();
