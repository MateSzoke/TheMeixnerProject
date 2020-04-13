import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExercisesComponent} from './exercises/exercises.component';
import {RouteGuardService} from './service/route-guard.service';
import {ExamsComponent} from './exams/exams.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {SorrendezesComponent} from './exercise_types/sorrendezes/sorrendezes.component';
import {PairingComponent} from './exercise_types/pairing/pairing.component';
import {GroupingComponent} from './exercise_types/grouping/grouping.component';


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
    path: 'parositas',
    component: PairingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'csoportositas',
    component: GroupingComponent,
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
