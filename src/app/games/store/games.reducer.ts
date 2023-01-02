import { createReducer, on } from '@ngrx/store';
import { invokeDeleteBookAPISuccess } from 'src/app/books/store/books.action';
import { Games } from './games';
import {
  GamesCountAPISuccess,
  GamesDeleteAPISuccess,
  GamesFetchAPISuccess,
  GamesSaveAPISuccess,
  GamesUpdateAPISuccess,
} from './games.action';

export const initialState: ReadonlyArray<Games> = [];

export const gameReducer = createReducer(
  initialState,
  on(GamesFetchAPISuccess, (state, { allGames }) => {
    return allGames;
  }),
  on(GamesSaveAPISuccess, (state, { response }) => {
    let newGame = [...state];
    newGame.unshift(response);
    return newGame;
  }),
  on(GamesUpdateAPISuccess, (state, { response }) => {
    let game = state.filter((_) => _.id !== response.id);
    game.unshift(response);
    return game;
  }),
  on(GamesDeleteAPISuccess, (state, { id }) => {
    let game = state.filter((_) => _.id !== id);
    return game;
  }),
  on(GamesCountAPISuccess, (state, { count }) => {
    return [...state];
  })
);
