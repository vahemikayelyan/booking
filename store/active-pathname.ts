import { create } from "zustand";

interface ActivePathnameState {
  activePathname: string;
  setActivePathname: (activePathname: string) => void;
}

export const useActivePathnameStore = create<ActivePathnameState>((set) => ({
  activePathname: "",
  setActivePathname: (activePathname) => set({ activePathname }),
}));
