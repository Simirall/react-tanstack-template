import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  auth,
  authStore,
  getAuthState,
  subscribeAuthState,
  useAuth,
} from "./auth";

import { AuthStoreProvider, resetAuthState } from "./test/auth-test-utils";

describe("認証ストア", () => {
  beforeEach(() => {
    resetAuthState();
  });

  test("共有ストアから現在の認証状態を取得できる", () => {
    resetAuthState({ isLogin: true });

    expect(getAuthState()).toEqual({ isLogin: true });
  });

  test("認証状態が変わると購読者へ通知される", () => {
    const callback = vi.fn();
    const unsubscribe = subscribeAuthState(callback);
    const callCountBeforeChange = callback.mock.calls.length;

    authStore.set(auth, { isLogin: true });

    expect(callback.mock.calls.length).toBeGreaterThan(callCountBeforeChange);

    unsubscribe();

    const callCountAfterUnsubscribe = callback.mock.calls.length;

    authStore.set(auth, { isLogin: false });

    expect(callback.mock.calls.length).toBe(callCountAfterUnsubscribe);
  });

  test("useAuth フックからログインとログアウトができる", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthStoreProvider,
    });

    expect(result.current.authState).toEqual({ isLogin: false });

    act(() => {
      result.current.login();
    });

    expect(result.current.authState).toEqual({ isLogin: true });
    expect(getAuthState()).toEqual({ isLogin: true });

    act(() => {
      result.current.logout();
    });

    expect(result.current.authState).toEqual({ isLogin: false });
    expect(getAuthState()).toEqual({ isLogin: false });
  });
});
