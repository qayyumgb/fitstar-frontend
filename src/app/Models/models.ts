export class addUsers {
  fullName: string='';
  location: string='';
  tokenStatus: Boolean=false;
  isDeleted: Boolean=false;
  status: string= 'active';
  _id: string = '';
  email: string='';
  password:string='';
  role: string='';
  createdAt: Date;
  updatedAt: Date;
  ProfileImage:string='';

  }

  export class Abbassador {
    abbassadorName: string=''
    tagline: string=''
    instaUrl: string=''
    fbUrl: string=''
    youtubeUrl: string=''
    twitterUrl: string=''
    description:string=''
    userProfile:string=''
  }
  export class Sponser {
    image:string='';
  }
  export class Collaborators {
    file:string='';
    userProfile:string=''
  }
  export class BlogPost {
    blogTitile: string='';
    shortdescription: string='';
    authorName: string='';
    catagory: {};
    featuredImage: string='';
    authorImage: string='';
    secoundFeaturedImage: string='';
    videolink: string='';
    typeDetail: string='';
  }

  export class SiginUp {
    name:string="";
    email:string='';
    password:string='';
    role:{}='';
    location:string='';
    phone:string='';

  }
