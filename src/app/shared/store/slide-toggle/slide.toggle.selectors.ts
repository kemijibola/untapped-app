import { createSelector} from '@ngrx/store';
import * as fromSlideToggle from './slide-toggle.reducers';
import * as fromApp from '../../../store/app.reducers';

const toggles = (state: fromApp.AppState) => state.toggles;

export const selectToggleList = createSelector(
    toggles,
    (state: fromSlideToggle.State) => state.toggles
);
