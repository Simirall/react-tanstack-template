import { Provider as JotaiProvider } from "jotai";
import type { PropsWithChildren } from "react";
import { type AuthState, auth, authStore } from "../auth";

export const AuthStoreProvider = ({ children }: PropsWithChildren) => (
  <JotaiProvider store={authStore}>{children}</JotaiProvider>
);

export const resetAuthState = (nextState: AuthState = { isLogin: false }) => {
  authStore.set(auth, nextState);
};
