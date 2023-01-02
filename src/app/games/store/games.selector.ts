import { Games } from './games';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGames = createFeatureSelector<Games[]>('mygames');

export const selectGameById = (gameId: number) => {
  return createSelector(selectGames, (games: Games[]) => {
    let gameById = games.filter((_) => _.id == gameId);
    if (gameById.length == 0) {
      return null;
    }
    return gameById[0];
  });
};

export const getCount = () => {
  return createSelector(selectGames, (games: Games[]) => {
    let count = games.length;
    return count;
  });
};
