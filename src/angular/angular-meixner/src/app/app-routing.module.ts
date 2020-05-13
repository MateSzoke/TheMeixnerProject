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
import {SortingComponent} from "./exercise_types/sorting/sorting.component";
import {SentenceCompletionComponent} from "./exercise_types/sentence-completion/sentence-completion.component";
import {SentenceCreationComponent} from "./exercise_types/sentence-creation/sentence-creation.component";
import {GroupingSortingComponent} from "./exercise_types/grouping-sorting/grouping-sorting.component";
import {SentencecompletionGroupingComponent} from "./exercise_types/sentencecompletion-grouping/sentencecompletion-grouping.component";
import {SentencecompletionSortingComponent} from "./exercise_types/sentencecompletion-sorting/sentencecompletion-sorting.component";
import {SentencecreationGroupingComponent} from "./exercise_types/sentencecreation-grouping/sentencecreation-grouping.component";
import {SentencecreationSortingComponent} from "./exercise_types/sentencecreation-sorting/sentencecreation-sorting.component";
import {SortingGroupingComponent} from "./exercise_types/sorting-grouping/sorting-grouping.component";
import {BlindMapComponent} from "./exercise_types/blind-map/blind-map.component";
import {FreetextComponent} from "./exercise_types/freetext/freetext.component";
import {OddoneoutComponent} from "./exercise_types/oddoneout/oddoneout.component";
import {TimelineComponent} from "./exercise_types/timeline/timeline.component";


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
