import { todoType } from './../types/todo';
import { create } from 'zustand';

interface EditState {
  editTodo: todoType | null;
  searchKeyword: string | null;
  refreshState: number;
  setRefreshState: (prev: number) => void;
  setEditTodo: (todo: todoType) => void;
  setSearchKeyword: (todo: string) => void;
  resetEditTodo: () => void;
}

const useTodoStore = create<EditState>((set) => ({
  editTodo: null,
  searchKeyword: null,
  refreshState: 0,
  // 단일 객체를 저장
  setEditTodo: (todo: todoType) => set({ editTodo: todo }),
  setSearchKeyword: (todo: string) => set({ searchKeyword: todo }),
  setRefreshState: (prev: number) => set({ refreshState: prev + 1 }),
  // 초기화
  resetEditTodo: () => set({ editTodo: null }),
}));

export default useTodoStore;
