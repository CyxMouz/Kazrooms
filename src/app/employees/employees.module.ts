import { EmployeesEffects } from './store/employees.effect';
import { EffectsModule } from '@ngrx/effects';
import { employeeReducer } from './store/employees.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmployeesRoutingModule,
    StoreModule.forFeature('myemployees', employeeReducer),
    EffectsModule.forFeature([EmployeesEffects]),
  ],
})
export class EmployeesModule {}
