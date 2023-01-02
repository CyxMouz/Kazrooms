import { selectEmployees } from './employees.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

import {
  EmployeesCountAPISuccess,
  EmployeesDeleteAPISuccess,
  EmployeesFetchAPISuccess,
  EmployeesSaveAPISuccess,
  EmployeesUpdateAPISuccess,
  InvokeCountEmployeesAPI,
  InvokeDeleteEmployeesAPI,
  InvokeFetchEmployeesAPI,
  InvokeSaveEmployeesAPI,
  InvokeUpdateEmployeesAPI,
} from './employees.action';

import { EmployeesService } from './../employees.service';

import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
@Injectable()
export class EmployeesEffects {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private employeesService: EmployeesService,
    private actions$: Actions
  ) {}
  loadAllGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeFetchEmployeesAPI),
      withLatestFrom(this.store.pipe(select(selectEmployees))),
      switchMap(([, employeesFromStore]) => {
        if (employeesFromStore.length > 0) {
          return EMPTY;
        }
        return this.employeesService
          .get()
          .pipe(
            map((data) => EmployeesFetchAPISuccess({ allEmployees: data }))
          );
      })
    )
  );
  saveNewEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeSaveEmployeesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeesService.create(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );

            return EmployeesSaveAPISuccess({ response: data });
          })
        );
      })
    )
  );

  updateNewEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeUpdateEmployeesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeesService.update(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return EmployeesUpdateAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeDeleteEmployeesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeesService.delete(action.id).pipe(
          map(() => {
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            });
            return EmployeesDeleteAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
  countEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeCountEmployeesAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.employeesService.get().pipe(
          map((e) => {
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            });
            return EmployeesCountAPISuccess({ count: e.length });
          })
        );
      })
    )
  );
}
