import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from './../../shared/store/app.selector';
import { InvokeUpdateEmployeesAPI } from './../store/employees.action';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Appstate } from 'src/app/shared/store/appstate';
import { Employees } from '../store/employees';
import { selectEmployeeById } from '../store/employees.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<Appstate>
  ) {}
  employeeForm: Employees = {
    id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    id_employee: '',
    games: [],
  };
  ngOnInit(): void {
    let fetchFromData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectEmployeeById(id)));
      })
    );
    fetchFromData$.subscribe((data) => {
      if (data) {
        this.employeeForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      InvokeUpdateEmployeesAPI({ payload: this.employeeForm })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/employees']);
      }
    });
  }
}
