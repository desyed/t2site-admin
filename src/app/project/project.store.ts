import { create } from 'zustand';

import type { Project } from './project.type';

export type ProjectStore = {
  projects: Project[];
  currentNewProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentNewProject: (currentNewProject: Project | null) => void;
  getCurrentNewProject: () => Project | null;
  activeProject: Project | null;
  setActiveProject: (activeProject: Project | null) => void;
  resetProjectCreation: () => void;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentNewProject: null,
  activeProject: null,
  setActiveProject: (activeProject) => set({ activeProject }),
  setProjects: (projects) => set({ projects }),
  setCurrentNewProject: (currentNewProject) => set({ currentNewProject }),
  getCurrentNewProject: () => {
    return get().currentNewProject;
  },
  resetProjectCreation: () => {
    set({
      currentNewProject: null,
      activeProject: null,
    });
  },
}));

export const projectStore = useProjectStore.getState();
