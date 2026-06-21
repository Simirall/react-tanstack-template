import { createRoot, type Root } from "react-dom/client";
import { App } from "../../src/App";
import { type AuthState, auth, authStore } from "../../src/auth";

const defaultAuthState: AuthState = { isLogin: false };

let activeContainer: HTMLDivElement | null = null;
let activeRoot: Root | null = null;

const removeActiveContainer = () => {
  activeContainer?.remove();
  activeContainer = null;
};

export const cleanupRenderedApp = () => {
  activeRoot?.unmount();
  activeRoot = null;
  removeActiveContainer();
  document.body.innerHTML = "";
  localStorage.clear();
  sessionStorage.clear();
  authStore.set(auth, defaultAuthState);
  window.history.replaceState({}, "", "/");
};

export const resetBrowserTestState = (options?: {
  route?: string;
  authState?: AuthState;
  storedAuthState?: AuthState;
}) => {
  cleanupRenderedApp();

  const route = options?.route ?? "/";
  const authState = options?.authState ?? defaultAuthState;

  authStore.set(auth, authState);

  if (options?.storedAuthState) {
    localStorage.setItem("auth", JSON.stringify(options.storedAuthState));
  }

  window.history.replaceState({}, "", route);
};

export const renderApp = (options?: {
  route?: string;
  authState?: AuthState;
  storedAuthState?: AuthState;
}) => {
  resetBrowserTestState(options);

  activeContainer = document.createElement("div");
  document.body.append(activeContainer);

  activeRoot = createRoot(activeContainer);
  activeRoot.render(<App />);

  return {
    container: activeContainer,
    unmount: cleanupRenderedApp,
  };
};
