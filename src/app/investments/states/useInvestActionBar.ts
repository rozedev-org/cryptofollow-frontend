import { create } from "zustand";

type HandleActionBarState = {
  totalSum: number;
  totalSelected: number;
  resetSignal: boolean;
  addTotalSum: (num: number) => void;
  reduceTotalSum: (num: number) => void;
  clearTotalSum:()=>void;
  toggleResetSignal: () => void;
};

export const useActionBarData = create<HandleActionBarState>((set) => ({
  totalSum: 0,
  totalSelected: 0,
  resetSignal: false,
  addTotalSum: (num) => set((state) => ({ totalSum: state.totalSum + num, totalSelected:state.totalSelected + 1 })),
  reduceTotalSum: (num) => set((state) => ({ totalSum: state.totalSum - num, totalSelected:state.totalSelected - 1 })),
  clearTotalSum:()=> set({totalSum:0, totalSelected:0}),
  toggleResetSignal: () =>
    set((state) => ({ resetSignal: !state.resetSignal })),
}));
