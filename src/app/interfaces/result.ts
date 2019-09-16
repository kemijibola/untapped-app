export interface IResult<T> {
  error?: string;
  data?: T;
  status: number;
}
