import { Games } from './store/games';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_games = 'http://localhost:3000/games';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Games[]>(`${API_games}`);
  }
  create(payload: Games) {
    return this.http.post<Games>(`${API_games}`, payload);
  }
  update(payload: Games) {
    return this.http.put<Games>(`${API_games}/${payload.id}`, payload);
  }
  delete(id: number) {
    return this.http.delete(`${API_games}/${id}`);
  }
}
