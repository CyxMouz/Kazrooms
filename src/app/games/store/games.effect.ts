import { selectGames } from './games.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

import {
  GamesCountAPISuccess,
  GamesDeleteAPISuccess,
  GamesFetchAPISuccess,
  GamesSaveAPISuccess,
  GamesUpdateAPISuccess,
  InvokeCountGamesAPI,
  InvokeDeleteGamesAPI,
  InvokeFetchGamesAPI,
  InvokeSaveGamesAPI,
  InvokeUpdateGamesAPI,
} from './games.action';

import { GamesService } from './../games.service';

import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
@Injectable()
export class GamesEffects {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private gamesService: GamesService,
    private actions$: Actions
  ) {}
  loadAllGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeFetchGamesAPI),
      withLatestFrom(this.store.pipe(select(selectGames))),
      switchMap(([, gamesFromStore]) => {
        if (gamesFromStore.length > 0) {
          return EMPTY;
        }
        return this.gamesService
          .get()
          .pipe(map((data) => GamesFetchAPISuccess({ allGames: data })));
      })
    )
  );
  saveNewGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeSaveGamesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.gamesService.create(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return GamesSaveAPISuccess({ response: data });
          })
        );
      })
    )
  );

  updateNewGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeUpdateGamesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.gamesService.update(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return GamesUpdateAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeDeleteGamesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.gamesService.delete(action.id).pipe(
          map(() => {
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            });
            return GamesDeleteAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
  countGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeCountGamesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.gamesService.get().pipe(
          map((e) => {
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            });
            return GamesCountAPISuccess({ count: e.length });
          })
        );
      })
    )
  );
}
