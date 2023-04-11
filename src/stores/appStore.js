import create from 'zustand';
import { useAuth } from '@/lib/auth';

export const appStore = create((set) => ({
  user: null,
}));
