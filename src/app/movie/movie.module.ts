import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent,personDialog } from './movie.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/Material';

const ROUTES = [
  {
    path:'',
    component:MovieComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MaterialModule.forRoot()
  ],
  entryComponents: [personDialog],
  declarations: [MovieComponent, personDialog]
})
export default class MovieModule { }
