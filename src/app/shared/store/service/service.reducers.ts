import { IService } from '../../../interfaces';
import * as ServiceActions from './service.actions';

export interface State {
  service: IService;
  selectedService: string;
}

const initialState: State = {
  service: {
    name: '',
    _id: '',
    description: '',
    price: 0
  },
  selectedService: ''
};

export function serviceReducer(
  state = initialState,
  action: ServiceActions.ServiceActions
) {
  switch (action.type) {
    case ServiceActions.SET_SERVICE:
      return {
        ...state,
        service: Object.assign(state.service, action.payload.service)
      };
    case ServiceActions.SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.payload.id
      };
    case ServiceActions.RESET_SELECTEDSERVICE:
      return {
        ...state,
        selectedService: ''
      };
    default:
      return state;
  }
}
