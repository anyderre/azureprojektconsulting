import create from 'zustand';

const useAppStore = create((set) => ({
  user: null,
  data: [],
  addData: (data) => set(() => ({ data: data })),
}));

export { useAppStore };
