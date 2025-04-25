import { create } from "zustand";

interface Project {
  id: number;
  title: string;
  type: string;
  stack: string[];
  description: string;
  longDescription: string;
  code?: string;
  deploy?: string;
  image: string;
  gallery: string[];
  buttonText: string;
}

interface ProjectStore {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearProject: () => set({ selectedProject: null }),
}));
