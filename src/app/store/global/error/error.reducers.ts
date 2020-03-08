import * as ErrorActions from './error.actions';

export interface State {
  data: any;
}

const initialState: State = {
  data: null
};

export function errorReducer(
  state = initialState,
  action: ErrorActions.ErrorActions
) {
  switch (action.type) {
    case ErrorActions.ADD_GLOBAL_ERROR:
      return {
        data: action.payload
      };
    default:
      return state;
  }
}
