import { environment } from 'src/environments/environment';

export const API_URL: string = environment.api_url;

export const API_ENDPOINTS = {
  // Authentication
  loginUser: `${API_URL}auth/signin`,
  verifyPhone: 'app/v1/auth/signup',
  signUp: 'app/v1/auth/basic/info',
  verifyOtp: 'app/v1/auth/verify/account',

  /**Users links */
  userList: `${API_URL}users/all/`,
  userCreate: `${API_URL}users/create`,
  userUpdate: `${API_URL}users/update`,
  userDelete: `${API_URL}users/delete`,

};
