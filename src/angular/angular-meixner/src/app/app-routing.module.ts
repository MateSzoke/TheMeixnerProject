import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';
import {RouteGuardService} from './service/route-guard.service';
import {ExercisesComponent} from './exercises/exercises.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {SorrendezesComponent} from './task_types/sorrendezes/sorrendezes.component';
import {PairingComponent} from './task_types/pairing/pairing.component';
import {GroupingComponent} from './task_types/grouping/grouping.component';


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
    path: 'feladatok/:viewtype',
    component: TasksComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'feladatsorok',
    component: ExercisesComponent,
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
