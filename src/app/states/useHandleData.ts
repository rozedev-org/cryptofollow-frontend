import { create } from "zustand";

type HandleDataState = {
  creating: boolean;
  refreshSignal: boolean;
  setIsCreating: (creating: boolean) => void;
  handleRefreshSignal: (refreshSignal: boolean) => void;
};

export const useHandleData = create<HandleDataState>((set) => ({
  creating: false,
  refreshSignal: false,
  setIsCreating: (creating) => set({ creating }),
  handleRefreshSignal: (refreshSignal) => set({ refreshSignal }),
}));
