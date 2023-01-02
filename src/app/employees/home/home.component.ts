import { InvokeCountEmployeesAPI } from './../store/employees.action';
import { setAPIStatus } from './../../shared/store/app.action';
import { selectEmployees, getCount } from './../store/employees.selector';
import { invokeBooksAPI } from './../../books/store/books.action';
import { selectBooks } from './../../books/store/books.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  InvokeDeleteEmployeesAPI,
  InvokeFetchEmployeesAPI,
} from '../store/employees.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formModal: any;
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  employees$ = this.store.pipe(select(selectEmployees));
  //getCount$: number = 0;
  idToDelete: number = 0;
  getCount$ = this.store.pipe(select(getCount()));
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.store.dispatch(InvokeFetchEmployeesAPI());
    this.store.dispatch(InvokeCountEmployeesAPI());
    // this.store.pipe(select(getCount())).subscribe((e) => {
    //   this.getCount$ = e;
    // });
  }
  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.formModal.show();
  }
  confirmDelete() {
    this.store.dispatch(InvokeDeleteEmployeesAPI({ id: this.idToDelete }));
    this.store.dispatch(InvokeCountEmployeesAPI());
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
