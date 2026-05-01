import { toast } from 'sonner';

import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';
import { storage } from 'src/utils/storage';

import { STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      // If it's not a JWT, we assume it's valid if it exists (e.g. Sanctum token)
      return !!accessToken;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return !!accessToken;
  }
}

// ----------------------------------------------------------------------

export async function tokenExpired(exp) {
  toast.error('Token expired!', { id: 'token-expired' });
  await storage.removeItem(STORAGE_KEY);
  window.location.href = paths.auth.jwt.signIn;
}

// ----------------------------------------------------------------------

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      await storage.setItem(STORAGE_KEY, accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      await storage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
