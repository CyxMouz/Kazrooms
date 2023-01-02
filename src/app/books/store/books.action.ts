import { Book } from './book';
import { createAction, props } from '@ngrx/store';

export const invokeBooksAPI = createAction(
  '[Books API] invoke books Fetch API'
);

export const booksFetchAPISuccess = createAction(
  '[Books API] books fetch API Success',
  props<{ allBooks: Book[] }>()
);

export const invokeSaveBookAPI = createAction(
  '[Books API] invoke save books API',
  props<{ payload: Book }>()
);

export const SaveBookAPISuccess = createAction(
  '[Books API] save books API Success',
  props<{ response: Book }>()
);

export const invokeUpdateBookAPI = createAction(
  '[Books API] invoke update books API',
  props<{ payload: Book }>()
);

export const invokeUpdateBookAPISuccess = createAction(
  '[Books API] update books API Success',
  props<{ response: Book }>()
);
export const invokeDeleteBookAPI = createAction(
  '[Books API] invoke delete books API',
  props<{ id: number }>()
);

export const invokeDeleteBookAPISuccess = createAction(
  '[Books API] delete books API Success',
  props<{ id: number }>()
);
