export interface IResult<T> {
  isSuccessful: boolean;
  error?: string;
  data?: T;
  responseCode: number;
}
