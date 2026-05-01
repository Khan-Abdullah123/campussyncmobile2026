import { useRef, useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import { storage } from 'src/utils/storage';
import axios, { endpoints } from 'src/utils/axios';

import { STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { signOut as jwtSignOut } from './action';
import { jwtDecode, setSession, isValidToken, tokenExpired } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const timerRef = useRef(null);

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = await storage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        await setSession(accessToken);

        const decoded = jwtDecode(accessToken);
        const role = decoded?.role;

        // Set up expiry timer
        if (decoded && decoded.exp) {
          const currentTime = Date.now();
          const timeLeft = decoded.exp * 1000 - currentTime;

          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            tokenExpired(decoded.exp);
          }, timeLeft);
        }

        const endpoint = role === 'teacher' ? endpoints.auth.teacher.me : endpoints.auth.parent.me;
        const res = await axios.get(endpoint);

        const { teacher, parent, user: userResponse } = res.data;
        const user = teacher || parent || userResponse;

        setState({ user: { ...user, accessToken, role }, loading: false });
      } else {
        await storage.removeItem(STORAGE_KEY);
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  const logout = useCallback(async () => {
    try {
      if (timerRef.current) clearTimeout(timerRef.current);
      await jwtSignOut();
      setState({ user: null });
    } catch (error) {
      console.error(error);
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      checkUserSession,
      logout,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
