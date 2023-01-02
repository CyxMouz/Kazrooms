import {
  InvokeFetchGamesAPI,
  InvokeCountGamesAPI,
  InvokeDeleteGamesAPI,
} from './../store/games.action';
import { getCount } from './../../games/store/games.selector';
import { selectGames } from './../store/games.selector';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formModal: any;

  constructor(private store: Store, private appStore: Store<Appstate>) {}

  games$ = this.store.pipe(select(selectGames));
  //getCount$: number = 0;
  idToDelete: number = 0;
  getCount$ = this.store.pipe(select(getCount()));
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.store.dispatch(InvokeFetchGamesAPI());
    this.store.dispatch(InvokeCountGamesAPI());
    // this.store.pipe(select(getCount())).subscribe((e) => {
    //   this.getCount$ = e;
    // });
  }
  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.formModal.show();
  }
  confirmDelete() {
    this.store.dispatch(InvokeDeleteGamesAPI({ id: this.idToDelete }));
    this.store.dispatch(InvokeCountGamesAPI());
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: { apiStatus: '', apiResponseMessage: 'success' },
          })
        );
        this.formModal.hide();
      }
    });
  }
}
