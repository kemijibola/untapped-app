export interface IRole {
  _id: string;
  name: string;
  global: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserType {
  _id: string;
  name: string;
  description: string;
}

export interface IPermission {
  _id: string;
  name: string;
  role: string;
}
