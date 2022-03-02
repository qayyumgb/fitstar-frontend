export interface IBlogposts {
  status: boolean;
  message: string;
  totalRecord: number;
  blogsPost: IBlogpost[];
}

export interface IBlogpost {
  userProfile?:string;
  createdAt: Date;
updatedAt: Date;
active?: boolean;
isDeleted: boolean;
_id: string;
}

export interface CreateUpdateBlogPost {
  userProfile?:string;

active?: boolean;

_id?: string;
}



