import { Games } from './games';
import { createAction, props } from '@ngrx/store';

export const InvokeFetchGamesAPI = createAction(
  '[Games API] Invoke Games Fetch API'
);
export const GamesFetchAPISuccess = createAction(
  '[Games API] Fetch Games API Success',
  props<{ allGames: Games[] }>()
);
export const InvokeSaveGamesAPI = createAction(
  '[Games API] Invoke Games Save API',
  props<{ payload: Games }>()
);
export const GamesSaveAPISuccess = createAction(
  '[Games API] Save Games API Success',
  props<{ response: Games }>()
);
export const InvokeUpdateGamesAPI = createAction(
  '[Games API] Invoke Games Update API',
  props<{ payload: Games }>()
);
export const GamesUpdateAPISuccess = createAction(
  '[Games API] Update Games API Success',
  props<{ response: Games }>()
);
export const InvokeDeleteGamesAPI = createAction(
  '[Games API] Invoke Games Delete API',
  props<{ id: number }>()
);
export const GamesDeleteAPISuccess = createAction(
  '[Games API] Delete Games API Success',
  props<{ id: number }>()
);
export const InvokeCountGamesAPI = createAction(
  '[Games API] Invoke Games Count API'
);
export const GamesCountAPISuccess = createAction(
  '[Games API] Count Games API Success',
  props<{ count: number }>()
);
