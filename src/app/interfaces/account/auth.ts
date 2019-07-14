export interface IRegister {
  name: string;
  email: string;
  password: string;
  role: string;
  audience: string;
}

export interface ILogin {
  email: string;
  password: string;
  audience: string;
}
