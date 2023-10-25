import { create } from "zustand";

interface LoginState {
  isLoggedin: boolean;
  setIsLoggedin: (isLoggedin: boolean) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoggedin: false,
  setIsLoggedin: (isLoggedin) => set({ isLoggedin }),
}));
