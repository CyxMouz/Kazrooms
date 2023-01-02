import { setAPIStatus } from './../../shared/store/app.action';
import { selectAppState } from './../../shared/store/app.selector';
import {
  invokeBooksAPI,
  invokeDeleteBookAPI,
  invokeDeleteBookAPISuccess,
} from './../store/books.action';
import { selectBooks } from './../store/books.selector';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formModal: any;
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  books$ = this.store.pipe(select(selectBooks));

  idToDelete: number = 0;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.formModal.show();
  }
  confirmDelete() {
    this.store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));
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
