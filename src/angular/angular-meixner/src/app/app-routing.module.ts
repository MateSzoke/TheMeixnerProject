import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExercisesComponent} from './exercises/exercises.component';
import {RouteGuardService} from './service/route-guard.service';
import {ExamsComponent} from './exams/exams.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {SorrendezesComponent} from './sorrendezes/sorrendezes.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'sorrendezes',
    component: SorrendezesComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'feladatok',
    component: ExercisesComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'feladatsorok',
    component: ExamsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'felhasznalok',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
