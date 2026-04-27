import { useAuthContext } from './use-auth-context';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const { user } = useAuthContext();

  return {
    user: user ? {
      ...user,
      displayName: user.name || user.displayName || 'User',
      photoURL: user.photoURL || user.avatarUrl || '',
      role: user.role || 'admin',
    } : null
  };
}
