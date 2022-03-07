export interface IBlogposts {
  status: boolean;
  message: string;
  totalRecord: number;
  blogsPost: IBlogpost[];
}

export interface IBlogpost {
  title: string;
  description: string;
  featuredImageOne: string;
  featuredImageTwo: string;
  authorImage: string;
  videoLink: string;
  details: string;
  userProfile?: string;
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
  isDeleted: boolean;
  _id: string;
}

export interface CreateUpdateBlogPost {
  userProfile?: string;

  active?: boolean;

  _id?: string;
}



export interface IBlog {
  status: boolean;
  message: string;
  totalRecord: number;
  blogs: Blog[];
}

export interface Blog {
  title: string;
  description: string;
  featuredImageOne: string;
  featuredImageTwo: string;
  authorImage: string;
  videoLink: string;
  details: string;
  active: boolean;
  isDeleted: boolean;
  _id: string;
  authorName: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
