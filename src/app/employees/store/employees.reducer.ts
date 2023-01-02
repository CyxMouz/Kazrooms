import { createReducer, on } from '@ngrx/store';
import { invokeDeleteBookAPISuccess } from 'src/app/books/store/books.action';
import { Employees } from './employees';
import {
  EmployeesCountAPISuccess,
  EmployeesDeleteAPISuccess,
  EmployeesFetchAPISuccess,
  EmployeesSaveAPISuccess,
  EmployeesUpdateAPISuccess,
} from './employees.action';

export const initialState: ReadonlyArray<Employees> = [];

export const employeeReducer = createReducer(
  initialState,
  on(EmployeesFetchAPISuccess, (state, { allEmployees }) => {
    return allEmployees;
  }),
  on(EmployeesSaveAPISuccess, (state, { response }) => {
    let newEmployee = [...state];
    newEmployee.unshift(response);
    return newEmployee;
  }),
  on(EmployeesUpdateAPISuccess, (state, { response }) => {
    let employee = state.filter((_) => _.id !== response.id);
    employee.unshift(response);
    return employee;
  }),
  on(EmployeesDeleteAPISuccess, (state, { id }) => {
    let employee = state.filter((_) => _.id !== id);
    return employee;
  }),
  on(EmployeesCountAPISuccess, (state, { count }) => {
    return [...state];
  })
);
