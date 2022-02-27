export interface ILandingPage {
    status: boolean;
    message: string;
    data: Data;
}

export interface Data {
    socialAccountDetails: SocialAccountDetails;
    aboutPageDetails: AboutPageDetails;
    privacyDetails: PrivacyDetails;
    footerDetails: FooterDetails;
    termConditions: TermConditions;
    landingPage: LandingPage[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AboutPageDetails {
    aboutUsBannerImage: string;
    bannerTitle: string;
    aboutUsMainHeading: string;
    aboutUsSubHeading: string;
    aboutUsDetails: string;
}

export interface FooterDetails {
    footerDetails: string;
    footerPhone: string;
}

export interface LandingPage {
    bannerTitle: string;
    bannerImage: string;
}

export interface PrivacyDetails {
    privacyPolicy: string;
}

export interface SocialAccountDetails {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
    linkedin: string;
}

export interface TermConditions {
    termsAndConditions: string;
}
