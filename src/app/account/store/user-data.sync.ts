// import { AuthState } from "./auth.reducers";
// import { ActionReducer, ActionReducerMap } from "@ngrx/store";
// import { FETCH_AUTHDATA, SET_AUTHDATA } from "./auth.actions";
// import { AppState, reducers } from 'src/app/store/app.reducers';

// export function userDataSync(reducer: ActionReducerMap<{data : AppState}>) {
//   return (state, action) => {
//     let reducedState = reducer(state, action);
//     if (action.type === FETCH_AUTHDATA) {
//       const data = window.localStorage.getItem("userData");
//       if (data) {
//         reducedState = {
//           ...reducedState,
//           user: JSON.parse(data)
//         };
//       }
//     } else if (action.type !== SET_AUTHDATA) {
//       window.localStorage.setItem(
//         "userData",
//         JSON.stringify(reducedState.user)
//       );
//     }
//     return reducedState;
//   };
// }
