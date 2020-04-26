export interface IService {
  _id?: string;
  name: string;
  price: number;
  vat: number;
  active: boolean;
  surchargeFee: number;
  description?: string;
}
