import { create } from 'zustand';

interface MemberState {
  member: string | null;
  setMember: (member: string) => void;
  resetMember: () => void;
}

const useMemberStore = create<MemberState>((set) => ({
  member: null,

  setMember: (m: string) => set({ member: m }),

  resetMember: () => set({ member: null }),
}));

export default useMemberStore;
