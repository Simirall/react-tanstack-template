import { createStore, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type AuthState = {
  isLogin: boolean;
};

export const auth = atomWithStorage<AuthState>(
  "auth",
  { isLogin: false },
  undefined,
  { getOnInit: true },
);

export const createAuthStore = () => createStore();

export let authStore = createAuthStore();

export const resetAuthStore = () => {
  authStore = createAuthStore();
  return authStore;
};

export const getAuthState = () => authStore.get(auth);

export const subscribeAuthState = (callback: () => void) =>
  authStore.sub(auth, callback);

export const useAuth = () => {
  const [authState, setAuthState] = useAtom(auth);

  const login = () => {
    setAuthState({ isLogin: true });
  };
  const logout = () => {
    setAuthState({ isLogin: false });
  };

  return { authState, login, logout };
};
