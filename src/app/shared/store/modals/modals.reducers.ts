import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
  NavigationData,
  MagnifierData
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "./modals.actions";
import { MediaType } from "src/app/interfaces";

export interface State {
  activeModal: IModal;
  navigationData: NavigationData;
  magnifierData: MagnifierData;
  showMagnifier: boolean;
}

const initialState: State = {
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
  },
  magnifierData: {
    index: -1,
    data: []
  },
  showMagnifier: false
};

export function ModalsReducer(
  state = initialState,
  action: ModalsActions.ModalsActions
) {
  switch (action.type) {
    case ModalsActions.TOGGLE_MODAL:
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
    case ModalsActions.SET_MAGNIFIER_DATA:
      return {
        ...state,
        magnifierData: { ...action.payload }
      };
    case ModalsActions.TOGGLE_MAGNIFIER:
      return {
        ...state,
        showMagnifier: action.payload
      };
    default:
      return state;
  }
}
