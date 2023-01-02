import { gameReducer } from './store/games.reducer';
import { GamesEffects } from './store/games.effect';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GamesRoutingModule } from './games-routing.module';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    FormsModule,
    StoreModule.forFeature('mygames', gameReducer),
    EffectsModule.forFeature([GamesEffects]),
  ],
})
export class GamesModule {}
