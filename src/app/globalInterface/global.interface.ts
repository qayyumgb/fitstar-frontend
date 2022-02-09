export interface shopInfo {
  image: string;
  name: string;
  address: string;
  country: string;
  phone: string;
  state: string;
  city: string;
  shopTypeId: number;
  userId: number
}
export interface Representative {
  name?: string;
  image?: string;
}

export interface userlist {
  srNum?: number;
  username?: string;
  role?: string;
  activeRole?: string;
  email?: string;
  createdAt?: string;
}

export interface ambassadorList {
  srNum?: number;
  image?: string;
  name?: string;
  tagline?: string;
  createdAt?: string;
  description?: string;
}

