import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../hooks/useAuth';

describe('Authentication', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should login with valid credentials', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const loginResult = result.current.login('intern@demo.com', 'intern123', false);
      expect(loginResult.success).toBe(true);
    });

    expect(result.current.user).toEqual({ email: 'intern@demo.com' });
  });

  it('should fail login with invalid credentials', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const loginResult = result.current.login('wrong@email.com', 'wrongpass', false);
      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe('Invalid email or password');
    });

    expect(result.current.user).toBeNull();
  });

  it('should logout user', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('intern@demo.com', 'intern123', false);
    });

    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
