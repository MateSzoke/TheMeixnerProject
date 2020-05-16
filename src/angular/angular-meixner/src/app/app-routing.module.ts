import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';
import {RouteGuardService} from './service/route-guard.service';
import {ExercisesComponent} from './exercises/exercises.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {SortingComponent} from "./task_types/sorting/sorting.component";
import {SentenceCompletionComponent} from "./task_types/sentence-completion/sentence-completion.component";
import {SentenceCreationComponent} from "./task_types/sentence-creation/sentence-creation.component";
import {GroupingSortingComponent} from "./task_types/grouping-sorting/grouping-sorting.component";
import {SentencecompletionGroupingComponent} from "./task_types/sentencecompletion-grouping/sentencecompletion-grouping.component";
import {SentencecompletionSortingComponent} from "./task_types/sentencecompletion-sorting/sentencecompletion-sorting.component";
import {SentencecreationGroupingComponent} from "./task_types/sentencecreation-grouping/sentencecreation-grouping.component";
import {SentencecreationSortingComponent} from "./task_types/sentencecreation-sorting/sentencecreation-sorting.component";
import {SortingGroupingComponent} from "./task_types/sorting-grouping/sorting-grouping.component";
import {BlindMapComponent} from "./task_types/blind-map/blind-map.component";
import {FreetextComponent} from "./task_types/freetext/freetext.component";
import {OddoneoutComponent} from "./task_types/oddoneout/oddoneout.component";
import {TimelineComponent} from "./task_types/timeline/timeline.component";
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
    path: 'csoportositas',
    component: GroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'parositas',
    component: PairingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'parositas/:id',
    component: PairingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'mondatkiegeszites',
    component: SentenceCompletionComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'mondatkeszites',
    component: SentenceCreationComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'sorrendezes',
    component: SortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'csoportositas_es_sorrendezes',
    component: GroupingSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'mondatkiegeszites_es_csoportositas',
    component: SentencecompletionGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'mondatkiegeszites_es_sorrendezes',
    component: SentencecompletionSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'mondatkeszites_es_sorrendezes',
    component: SentencecreationSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'sorrendezes_es_csoportositas',
    component: SortingGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'memoriajatek',
    component: BlindMapComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'szabadszoveges_feladatok',
    component: FreetextComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'kakukktojas',
    component: OddoneoutComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'idoszalag',
    component: TimelineComponent,
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
