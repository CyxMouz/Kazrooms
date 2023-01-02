import { Games } from './../../games/store/games';
export interface Employees {
  id: number;
  id_employee: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  games: Games[];
}

export interface EmployeesState {
  employees: Employees[];
}
