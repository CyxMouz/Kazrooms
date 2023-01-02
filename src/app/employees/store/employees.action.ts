import { Employees } from './employees';
import { createAction, props } from '@ngrx/store';

export const InvokeFetchEmployeesAPI = createAction(
  '[Employees API] Invoke Employees Fetch API'
);
export const EmployeesFetchAPISuccess = createAction(
  '[Employees API] Fetch Employees API Success',
  props<{ allEmployees: Employees[] }>()
);
export const InvokeSaveEmployeesAPI = createAction(
  '[Employees API] Invoke Employees Save API',
  props<{ payload: Employees }>()
);
export const EmployeesSaveAPISuccess = createAction(
  '[Employees API] Save Employees API Success',
  props<{ response: Employees }>()
);
export const InvokeUpdateEmployeesAPI = createAction(
  '[Employees API] Invoke Employees Update API',
  props<{ payload: Employees }>()
);
export const EmployeesUpdateAPISuccess = createAction(
  '[Employees API] Update Employees API Success',
  props<{ response: Employees }>()
);
export const InvokeDeleteEmployeesAPI = createAction(
  '[Employees API] Invoke Employees Delete API',
  props<{ id: number }>()
);
export const EmployeesDeleteAPISuccess = createAction(
  '[Employees API] Delete Employees API Success',
  props<{ id: number }>()
);
export const InvokeCountEmployeesAPI = createAction(
  '[Employees API] Invoke Employees Count API'
);
export const EmployeesCountAPISuccess = createAction(
  '[Employees API] Count Employees API Success',
  props<{ count: number }>()
);
