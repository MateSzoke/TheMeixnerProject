import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {SentencecreationSortingComponent} from "./task_types/sentencecreation-sorting/sentencecreation-sorting.component";
import {SortingGroupingComponent} from "./task_types/sorting-grouping/sorting-grouping.component";
import {PairingComponent} from './task_types/pairing/pairing.component';
import {GroupingComponent} from './task_types/grouping/grouping.component';
import {UserResultsComponent} from "./users/user-results/user-results.component";
import {Path} from "./path";
import {NotFoundComponent} from "./not-found/not-found.component";
import {MyResultsComponent} from "./student/my-results/my-results.component";
import {MyExercisesComponent} from "./student/my-exercises/my-exercises.component";
import {TrueFalseComponent} from "./task_types/true-false/true-false.component";
import {StudentMemoryGameComponent} from "./student/tasks/student-memory-game/student-memory-game.component";
import {StudentGroupingComponent} from "./student/tasks/student-grouping/student-grouping.component";
import {StudentPairingComponent} from "./student/tasks/student-pairing/student-pairing.component";
import {StudentSentenceCompletionComponent} from "./student/tasks/student-sentence-completion/student-sentence-completion.component";
import {StudentSentenceCreationComponent} from "./student/tasks/student-sentence-creation/student-sentence-creation.component";
import {StudentSortingComponent} from "./student/tasks/student-sorting/student-sorting.component";
import {StudentTrueFalseComponent} from "./student/tasks/student-true-false/student-true-false.component";
import {EasyTaskComponent} from "./task_types/easy-task/easy-task.component";
import {MemoryGameComponent} from "./task_types/memory-game/memory-game.component";
import {StudentGroupingAndSortingComponent} from "./student/tasks/student-grouping-and-sorting/student-grouping-and-sorting.component";
import {StudentSortingAndGroupingComponent} from "./student/tasks/student-sorting-and-grouping/student-sorting-and-grouping.component";
import {StudentSentenceCompletionAndGroupingComponent} from "./student/tasks/student-sentence-completion-and-grouping/student-sentence-completion-and-grouping.component";
import {StudentSentenceCreationAndGroupingComponent} from "./student/tasks/student-sentence-creation-and-grouping/student-sentence-creation-and-grouping.component";
import {StudentSentenceCompletionAndSortingComponent} from "./student/tasks/student-sentence-completion-and-sorting/student-sentence-completion-and-sorting.component";
import {StudentSentenceCreationAndSortingComponent} from "./student/tasks/student-sentence-creation-and-sorting/student-sentence-creation-and-sorting.component";
import {StudentBlindmapComponent} from "./student/tasks/student-blindmap/student-blindmap.component";


const routes: Routes = [
  {
    path: Path.EASY_TASK,
    component: EasyTaskComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.GROUPING,
    component: GroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.PAIRING,
    component: PairingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SENTENCE_COMPLETION,
    component: SentenceCompletionComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SENTENCE_CREATION,
    component: SentenceCreationComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SORTING,
    component: SortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.TRUEFALSE,
    component: TrueFalseComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.GROUPING_SORTING,
    component: GroupingSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SENTENCE_COMPLETION_GROUPING,
    component: SentencecompletionGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SENTENCE_CREATION_SORTING,
    component: SentencecreationSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.SORTING_GROUPING,
    component: SortingGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.MEMORY_GAME,
    component: MemoryGameComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: `${Path.TASKS}/:viewtype`,
    component: TasksComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.EXERCISES,
    component: ExercisesComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.USERS,
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.USER_DETAILS,
    component: UserResultsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_RESULTS,
    component: MyResultsComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_EXERCISES,
    component: MyExercisesComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_GROUPING,
    component: StudentGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_PAIRING,
    component: StudentPairingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_MEMORY_GAME,
    component: StudentMemoryGameComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_COMPLETION,
    component: StudentSentenceCompletionComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_CREATION,
    component: StudentSentenceCreationComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SORTING,
    component: StudentSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_TRUEFALSE,
    component: StudentTrueFalseComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_GROUPING_SORTING,
    component: StudentGroupingAndSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SORTING_GROUPING,
    component: StudentSortingAndGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_COMPLETION_GROUPING,
    component: StudentSentenceCompletionAndGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_CREATION_GROUPING,
    component: StudentSentenceCreationAndGroupingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_COMPLETION_SORTING,
    component: StudentSentenceCompletionAndSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_SENTENCE_CREATION_SORTING,
    component: StudentSentenceCreationAndSortingComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.STUDENT_BLINDMAP,
    component: StudentBlindmapComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: Path.LOGIN,
    component: LoginComponent
  },
  {
    path: '',
    component: NotFoundComponent,
    canActivate: [RouteGuardService]
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
