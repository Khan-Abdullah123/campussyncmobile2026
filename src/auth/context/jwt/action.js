import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';


/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, phoneNumber, password, role }) => {
  try {
    const identifier = email || phoneNumber;

    const params = {
      email: identifier,
      password,
      role,
      // Some backends specifically look for phone
      ...(phoneNumber && { phone: phoneNumber }),
    };

    const endpoint = role === 'teacher' ? endpoints.auth.teacher.login : endpoints.auth.parent.login;

    const res = await axios.post(endpoint, params);

    const { token, teacher, parent, user: userResponse } = res.data;

    const accessToken = token;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);

    sessionStorage.setItem('user_role', role);

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
    const role = sessionStorage.getItem('user_role');
    const endpoint = role === 'teacher' ? endpoints.auth.teacher.logout : endpoints.auth.parent.logout;
    
    await axios.post(endpoint);
    await setSession(null);
    sessionStorage.removeItem('user_role');
  } catch (error) {
    console.error('Error during sign out:', error);
    await setSession(null);
    sessionStorage.removeItem('user_role');
    throw error;
  }
};
