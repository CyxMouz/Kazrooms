import { createReducer, on } from '@ngrx/store';

import { Book } from './book';
import {
  booksFetchAPISuccess,
  SaveBookAPISuccess,
  invokeUpdateBookAPISuccess,
  invokeDeleteBookAPISuccess,
} from './books.action';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(SaveBookAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(invokeUpdateBookAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(invokeDeleteBookAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);
