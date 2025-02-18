import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
  setTotalPages: (t) => set({ totalPages: t }),
}));

export default usePaginationStore;
