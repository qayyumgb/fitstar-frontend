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

  /**Ambassador links */
  ambassadorList: `${API_URL}ambassadors/get/`,
  ambassadorCreate: `${API_URL}ambassadors/create`,
  ambassadorUpdate: `${API_URL}ambassadors/update/`,
  ambassadorDelete: `${API_URL}ambassadors/delete`,
  ambassadorSearch: `${API_URL}blogs/search/`,
  /**blogs links */
  blogList: `${API_URL}blogs/get/`,
  blogCreate: `${API_URL}blogs/create`,
  blogUpdate: `${API_URL}blogs/update/`,
  blogDelete: `${API_URL}blogs/delete`,
  blogSearch: `${API_URL}blogs/search/`,
  /*sponsorss links */
  sponsorList: `${API_URL}sponsors/get/`,
  sponsorCreate: `${API_URL}sponsors/create`,
  sponsorUpdate: `${API_URL}sponsors/update/`,
  sponsorDelete: `${API_URL}sponsors/delete`,
  sponsorSearch: `${API_URL}sponsors/search/`,

  /*Collabotors links */
  collaboratorsList: `${API_URL}collaborators/get/`,
  collaboratorsCreate: `${API_URL}collaborators/create`,
  collaboratorsUpdate: `${API_URL}collaborators/update/`,
  collaboratorsDelete: `${API_URL}collaborators/delete`,
  collaboratorsSearch: `${API_URL}collaborators/search/`,

  // Landing
  getLandingPage: `${API_URL}landing/get/`,
  updateLandingPAge: `${API_URL}landing/update/`,


};
