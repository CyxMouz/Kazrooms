import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { Appstate } from './appstate';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: Appstate }>()
);
