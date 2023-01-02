import { Employees } from './store/employees';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_employees = 'http://localhost:3000/employees';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Employees[]>(`${API_employees}`);
  }
  create(payload: Employees) {
    return this.http.post<Employees>(`${API_employees}`, payload);
  }
  update(payload: Employees) {
    return this.http.put<Employees>(`${API_employees}/${payload.id}`, payload);
  }
  delete(id: number) {
    return this.http.delete(`${API_employees}/${id}`);
  }
}
