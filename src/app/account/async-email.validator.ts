import { concatMap } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { FormControl } from "@angular/forms";
import { timer, Observable } from "rxjs";
import { map } from "rxjs/operators/";
import { IResult, IUser } from "../interfaces";

export function emailAsyncValidator(
  time: number = 500,
  userService: UserService
) {
  return (input: FormControl): Observable<any> | Promise<any> => {
    return timer(time).pipe(
      concatMap(() => userService.findUserByEmail(input.value)),
      map((res: IResult<IUser[]>) => {
        return res.data.length === 0 ? null : { emailExist: true };
      })
    );
  };
}
