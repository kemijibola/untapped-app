export interface IAuthData {
    token: string;
    permissions: [];
    user: IUser;
}

export interface IUser {
    _id: string;
    name: string;
    user_type: string;
}
