import { Modal } from 'src/app/interfaces';
import * as ModalsActions from './modals.actions';

export interface State {
  modals: Modal[];
  modalId: string;
}

const initialState: State = {
  modals: [],
  modalId: ''
};

export function ModalsReducer(
  state = initialState,
  action: ModalsActions.ModalsActions
) {
  switch (action.type) {
    case ModalsActions.ADD_MODAL:
      return {
        ...state,
        modals: [...state.modals, action.payload]
      };
    case ModalsActions.SET_MODAL_ID:
      return {
        ...state,
        modalId: action.payload
      };
    default:
      return state;
  }
}
