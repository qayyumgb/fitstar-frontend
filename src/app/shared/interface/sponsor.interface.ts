export interface IBlogposts {
  status: boolean;
  message: string;
  totalRecord: number;
  sponsors: ISponsors[];
}

export interface ISponsors {
  title: string
  description: string
  authorName:string
  category: string

  videoLink: string
  details: string
  authorImage: string
  featuredImageOne: string
  featuredImageTwo: string
  createdAt: Date;
updatedAt: Date;
active?: boolean;
isDeleted: boolean;
_id: string;
}

export interface CreateUpdateSponsors {
  title?: string;
  description?: string;
  authorName?:string;
  category?: string;

  videoLink?: string;
  details?: string;
  authorImage?: string;
  featuredImageOne?: string ;
  featuredImageTwo?: string;

active?: boolean;

_id?: string;
}


