import * as GlobalErrorActions from "./error.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface AppError {
  errorMessage: string;
  errorCode: number;
}
export interface State extends EntityState<AppError> {
  error: AppError;
}

export const globalErrorAdapter: EntityAdapter<AppError> = createEntityAdapter<
  AppError
>();

const initialState: State = globalErrorAdapter.getInitialState({
  error: {
    errorMessage: "",
    errorCode: 0
  }
});

export function errorReducer(
  state = initialState,
  action: GlobalErrorActions.GlobalErrorActions
): State {
  switch (action.type) {
    case GlobalErrorActions.ADD_GLOBAL_ERROR:
      return globalErrorAdapter.setOne(action.payload, state);
    default:
      return state;
  }
}
