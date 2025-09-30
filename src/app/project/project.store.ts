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
  currentNewProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentNewProject: (currentNewProject: Project | null) => void;
  servicesPayload: ServicePayload[];
  createProjectSteps: TCreateProjectStep[];
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  getCurrentStep: () => TCreateProjectStep | undefined;
  getCurrentNewProject: () => Project | null;
  activeProject: Project | null;
  setActiveProject: (activeProject: Project | null) => void;
  resetProjectCreation: () => void;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  servicesPayload: [],
  currentNewProject: null,
  createProjectSteps: [...initialCreateProjectStep],
  currentStep: 0,
  activeProject: null,
  setActiveProject: (activeProject) => set({ activeProject }),
  setProjects: (projects) => set({ projects }),
  setCurrentNewProject: (currentNewProject) => set({ currentNewProject }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  getCurrentStep: () => {
    return get().createProjectSteps[get().currentStep];
  },
  getCurrentNewProject: () => {
    return get().currentNewProject;
  },
  resetProjectCreation: () => {
    set({
      currentNewProject: null,
      currentStep: 0,
      activeProject: null,
    });
  },
}));

export const projectStore = useProjectStore.getState();
