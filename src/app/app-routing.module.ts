import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((b) => b.BooksModule),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((b) => b.EmployeesModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/games.module').then((b) => b.GamesModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./clients/clients.module').then((b) => b.ClientsModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
