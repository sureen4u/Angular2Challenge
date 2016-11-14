import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/Material';

const ROUTES = [
  {
    path:'',
    component:GameComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MaterialModule.forRoot()
  ],
  declarations: [GameComponent]
})
export default class GameModule { }
