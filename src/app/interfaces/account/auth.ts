export interface IRegister {
  username: string;
  email: string;
  password: string;
  roles: string[];
  audience: string;
}

export interface ILogin {
  email: string;
  password: string;
  audience: string;
}
