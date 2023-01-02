import { appReducer } from './app.reducer';
import { Appstate } from './appstate';
import { createFeatureSelector } from '@ngrx/store';

export const selectAppState= createFeatureSelector<Appstate>('myappstate',)