export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
  audience: string;
  confirmationUrl: string;
}

export interface ILogin {
  email: string;
  password: string;
  audience: string;
}

export interface IConfirmEmail {
  email: string;
  token: string;
  audience: string;
}
