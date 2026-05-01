import { storage } from 'src/utils/storage';
import axios, { endpoints } from 'src/utils/axios';

import { STORAGE_KEY } from './constant';
import { jwtDecode, setSession } from './utils';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password, role }) => {
  try {
    const params = {
      email,
      password,
      role,
    };

    const endpoint = role === 'teacher' ? endpoints.auth.teacher.login : endpoints.auth.parent.login;

    const res = await axios.post(endpoint, params);

    const { token, teacher, parent, user: userResponse } = res.data;

    const accessToken = token;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    await setSession(accessToken);

    return { user: teacher || parent || userResponse, accessToken };
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    const accessToken = await storage.getItem(STORAGE_KEY);
    const decodedToken = jwtDecode(accessToken);
    const role = decodedToken?.role;

    const endpoint = role === 'teacher' ? endpoints.auth.teacher.logout : endpoints.auth.parent.logout;

    if (endpoint) {
      await axios.post(endpoint);
    }

    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    await setSession(null);
    throw error;
  }
};
