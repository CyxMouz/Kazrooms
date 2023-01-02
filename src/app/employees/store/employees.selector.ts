import { Employees } from './employees';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectEmployees =
  createFeatureSelector<Employees[]>('myemployees');

export const selectEmployeeById = (employeeId: number) => {
  return createSelector(selectEmployees, (employees: Employees[]) => {
    let employeeById = employees.filter((_) => _.id == employeeId);
    if (employeeById.length == 0) {
      return null;
    }
    return employeeById[0];
  });
};

export const getCount = () => {
  return createSelector(selectEmployees, (employees: Employees[]) => {
    let count = employees.length;
    return count;
  });
};
