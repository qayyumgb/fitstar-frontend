export interface IUserData {
  message: string;
  token: string;
  user: User;
  refreshToken: string;
}

export interface User {
  fullName: string;
  location: string;
  tokenStatus: boolean;
  isDeleted: boolean;
  status: string;
  _id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: string;
}
