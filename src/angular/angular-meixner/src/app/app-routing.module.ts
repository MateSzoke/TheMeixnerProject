import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExercisesComponent} from './exercises/exercises.component';
import {RouteGuardService} from './service/route-guard.service';


const routes: Routes = [
  {
    path: '', component: ExercisesComponent,
    canActivate: [RouteGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
