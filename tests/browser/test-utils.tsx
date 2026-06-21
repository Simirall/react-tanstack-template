import { createRoot, type Root } from "react-dom/client";
import { App } from "../../src/App";
import {
  type AuthState,
  auth,
  authStore,
  resetAuthStore,
} from "../../src/auth";

let activeContainer: HTMLDivElement | null = null;
let activeRoot: Root | null = null;

const removeActiveContainer = () => {
  activeContainer?.remove();
  activeContainer = null;
};

export const cleanupRenderedApp = (options?: { preserveStorage?: boolean }) => {
  activeRoot?.unmount();
  activeRoot = null;
  removeActiveContainer();
  document.body.innerHTML = "";

  if (!options?.preserveStorage) {
    localStorage.clear();
  }

  sessionStorage.clear();
  resetAuthStore();
  window.history.replaceState({}, "", "/");
};

export const resetBrowserTestState = (options?: {
  route?: string;
  authState?: AuthState;
  storedAuthState?: AuthState;
  preserveStorage?: boolean;
}) => {
  cleanupRenderedApp({ preserveStorage: options?.preserveStorage });

  const route = options?.route ?? "/";

  if (options?.storedAuthState) {
    localStorage.setItem("auth", JSON.stringify(options.storedAuthState));
  }

  if (options?.authState) {
    authStore.set(auth, options.authState);
  }

  window.history.replaceState({}, "", route);
};

export const renderApp = (options?: {
  route?: string;
  authState?: AuthState;
  storedAuthState?: AuthState;
  preserveStorage?: boolean;
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
