import { create } from 'zustand';

interface CalendarState {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useCalendarStore;
