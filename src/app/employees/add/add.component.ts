import { setAPIStatus } from './../../shared/store/app.action';
import { selectAppState } from './../../shared/store/app.selector';
import { InvokeSaveEmployeesAPI } from './../store/employees.action';
import { Employees } from './../store/employees';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}
  employeeForm: Employees = {
    id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    id_employee: '',
    games: [],
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(InvokeSaveEmployeesAPI({ payload: this.employeeForm }));
    let appStore$ = this.appStore.pipe(select(selectAppState));
    appStore$.subscribe((data) => {
      if (data.apiStatus === 'success')
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      this.router.navigate(['/employees']);
    });
  }
}
