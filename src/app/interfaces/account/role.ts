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

export interface IRolePermission {
  _id: string;
  userType: string;
  permission: Permission;
  updatedAt: Date;
  createdAt: Date;
  role: string;
}

export interface Permission {
  _id: string;
  name: string;
}
