export interface ICollaborators {
    status: boolean;
    message: string;
    totalRecord: number;
    collaborators: ICollaborator[];
}

export interface ICollaborator {
    title: string;
    subTitle: string;
    picture: string;
    facebook: string;
    youtube: string;
    tiwtter: string;
    active: boolean;
    isDeleted: boolean;
    _id?: string;
    instagram: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUpdateCollaborator {
    _id?: string;
    title?: string;
    subTitle?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiwtter?: string;
    picture?: string;
    active?: boolean;
}


