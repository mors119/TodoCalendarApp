import { create } from 'zustand';

interface sidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const screenWidth = window.innerWidth;
const useSidebarStore = create<sidebarState>((set) => ({
  isOpen: screenWidth > 600 ? true : false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
