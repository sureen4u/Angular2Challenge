
import {Routes } from '@angular/router';

export const routes : Routes   = [
    {path: '', redirectTo: 'movies', pathMatch: 'full'},
    {
      path:'movies' ,
      loadChildren: "./movie/movie.module"
    },
    {
      path:'game' ,
      loadChildren: "./game/game.module"
    }
];
