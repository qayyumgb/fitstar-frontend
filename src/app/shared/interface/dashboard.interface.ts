export interface IDashboardCounter {
  status: boolean;
  message: string;
  totalAmbassadors: number;
  totalUsers: number;
  totalBlogs: number;
  totalSponsor: number;
  totalCollaborator: number;
}

export interface IDashboardLatestUser {
  status: boolean;
  message: string;
  latestUsers: LatestUser[];
}

export interface IDashboardGraphData {
  message: string;
  labels: [];
  data: [];
}

export interface LatestUser {
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
}
