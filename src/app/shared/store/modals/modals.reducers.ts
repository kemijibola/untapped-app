import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
  NavigationData
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "./modals.actions";
import { MediaType } from "src/app/interfaces";

export interface State {
  modals: AppModal[];
  activeModal: IModal;
  navigationData: NavigationData;
}

const initialState: State = {
  modals: [],
  activeModal: {
    index: 0,
    name: "",
    display: ModalDisplay.none,
    viewMode: ModalViewModel.none,
    contentType: "",
    data: null,
    modalCss: "",
    modalDialogCss: "",
    showMagnifier: false
  },
  navigationData: {
    currentIndex: 0,
    mediaType: ""
  }
};

export function ModalsReducer(
  state = initialState,
  action: ModalsActions.ModalsActions
) {
  switch (action.type) {
    case ModalsActions.TOGGLE_MODAL:
      const componentModal = state.modals.filter(
        x => x.component === action.payload.component
      )[0];
      if (componentModal) {
        componentModal.modals = [
          ...componentModal.modals,
          action.payload.modal
        ];
      }
      return {
        ...state,
        activeModal: { ...state.activeModal, ...action.payload.modal }
      };
    case ModalsActions.RESET_CURRENT_MODAL:
      return {
        ...state,
        activeModal: Object.assign({})
      };
    case ModalsActions.SET_NAVIGATION_PROPERTIES:
      return {
        ...state,
        navigationData: { ...state.navigationData, ...action.payload }
      };
    default:
      return state;
  }
}
