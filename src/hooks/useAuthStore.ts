import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type SubscriptionStatus = 'free' | 'pro';
type User = {
  name: string;
  email: string;
  avatarUrl: string;
};
type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  subscriptionStatus: SubscriptionStatus;
};
type AuthActions = {
  login: (user: User) => void;
  logout: () => void;
  subscribe: () => void;
};
const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      subscriptionStatus: 'free',
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null, subscriptionStatus: 'free' }),
      subscribe: () => set({ subscriptionStatus: 'pro' }),
    }),
    {
      name: 'vibecode-auth-storage', // name of the item in the storage (must be unique)
    }
  )
);
export default useAuthStore;