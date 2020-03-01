export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IConfirmEmail {
  email: string;
  token: string;
}
