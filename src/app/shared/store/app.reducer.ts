import { on } from '@ngrx/store';
import { setAPIStatus } from './app.action';
import { Appstate } from './appstate';
import { createReducer } from '@ngrx/store';

export const initialState :Appstate = {
    apiStatus :'',
    apiResponseMessage: '',
}
export const appReducer = createReducer(
    initialState,
    on(setAPIStatus,(state, {apiStatus}) => {
        return apiStatus
    }))