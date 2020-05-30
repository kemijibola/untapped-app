// import { CanActivate } from "@angular/router";
// import { Store, select } from "@ngrx/store";
// import * as fromApp from "../../store/app.reducers";
// import { Injectable } from "@angular/core";
// import { Observable, of } from "rxjs";
// import { IUser, IAuthData } from "src/app/interfaces";
// import { selectUser } from "../../account/store/user/user.selectors";
// import * as UserActions from "../../account/store/user/user.actions";
// import { selectUserData } from "../../account/store/auth.selectors";
// import { tap, catchError, concatMap } from "rxjs/operators";

// @Injectable()
// export class EmailConfirmedGuard implements CanActivate {
//   constructor(private store: Store<fromApp.AppState>) {}

//   getUserFromStore(): Observable<IUser> {
//     return this.store.pipe(
//       select(selectUser),
//       tap((val: IUser) => {
//         if (!val._id) {
//           this.store
//             .pipe(select(selectUserData))
//             .subscribe((data: IAuthData) => {
//               this.store.dispatch(
//                 new UserActions.FetchUser({ id: data.user_data._id })
//               );
//             });
//         }
//       })
//     );
//   }

//   canActivate(): Observable<boolean> {
//     return this.getUserFromStore().pipe(
//       concatMap(() => of(true)),
//       catchError(() => of(false))
//     );
//   }
// }
