export interface IShopUser {
  status: boolean;
  message: string;
  totalRecord: number;
  users: IShopUserEntity[];
}

export interface IShopUserEntity {
  fullName: string;
  location: string;
  tokenStatus: boolean;
  isDeleted: boolean;
  status: string;
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: string;
  activeStatus: boolean
}

export enum UserStatusEnum {
  active = 'active',
  blocked = 'blocked'
}


export interface IShopStatusInterface {
  message: string;
}
