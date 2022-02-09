import { environment } from 'src/environments/environment';

export const API_URL: string = environment.api_url;

export const API_ENDPOINTS = {
  // Authentication
  loginUser: 'app/v1/auth/signin',
  verifyPhone: 'app/v1/auth/signup',
  signUp: 'app/v1/auth/basic/info',
  verifyOtp: 'app/v1/auth/verify/account',
};
