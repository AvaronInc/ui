
import { create } from 'zustand';

interface CliModalStore {
  isOpen: boolean;
  openCliModal: () => void;
  closeCliModal: () => void;
}

export const useCliModal = create<CliModalStore>((set) => ({
  isOpen: false,
  openCliModal: () => set({ isOpen: true }),
  closeCliModal: () => set({ isOpen: false }),
}));
