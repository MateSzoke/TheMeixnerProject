import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TasksComponent} from './tasks/tasks.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {NewExerciseComponent} from './new-exercise/new-exercise.component';
import {ModalComponent} from './modal/modal.component';
import {DomService} from './service/dom.service';
import {ModalService} from './service/modal.service';
import {NewTaskComponent} from './new-task/new-task.component';
import {GroupingComponent} from './task_types/grouping/grouping.component';
import {PairingComponent} from './task_types/pairing/pairing.component';
import {SentenceCompletionComponent} from './task_types/sentence-completion/sentence-completion.component';
import {SentenceCreationComponent} from './task_types/sentence-creation/sentence-creation.component';
import {SortingComponent} from './task_types/sorting/sorting.component';
import {GroupingSortingComponent} from './task_types/grouping-sorting/grouping-sorting.component';
import {SentencecompletionGroupingComponent} from './task_types/sentencecompletion-grouping/sentencecompletion-grouping.component';
import {SentencecompletionSortingComponent} from './task_types/sentencecompletion-sorting/sentencecompletion-sorting.component';
import {SentencecreationGroupingComponent} from './task_types/sentencecreation-grouping/sentencecreation-grouping.component';
import {SentencecreationSortingComponent} from './task_types/sentencecreation-sorting/sentencecreation-sorting.component';
import {SortingGroupingComponent} from './task_types/sorting-grouping/sorting-grouping.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpInterceptorService} from "./service/http-interceptor.service";
import {ExerciseTaskListComponent} from './exercise-task-list/exercise-task-list.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UserResultsComponent} from './users/user-results/user-results.component';
import {ExerciseListComponent} from './users/excercise-list/exercise-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MyExercisesComponent} from './student/my-exercises/my-exercises.component';
import {MyResultsComponent} from './student/my-results/my-results.component';
import {TrueFalseComponent} from './task_types/true-false/true-false.component';
import {StudentPairingComponent} from './student/tasks/student-pairing/student-pairing.component';
import {StudentGroupingComponent} from './student/tasks/student-grouping/student-grouping.component';
import {StudentSortingComponent} from './student/tasks/student-sorting/student-sorting.component';
import {StudentSentenceCreationComponent} from './student/tasks/student-sentence-creation/student-sentence-creation.component';
import {StudentSentenceCompletionComponent} from './student/tasks/student-sentence-completion/student-sentence-completion.component';
import {StudentTrueFalseComponent} from './student/tasks/student-true-false/student-true-false.component';
import {StudentMemoryGameComponent} from './student/tasks/student-memory-game/student-memory-game.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ExerciseResultComponent} from './student/exercise-result/exercise-result.component';
import {PairingResultComponent} from './student/tasks/result/pairing-result/pairing-result.component';
import {GroupingResultComponent} from './student/tasks/result/grouping-result/grouping-result.component';
import {SortingResultComponent} from './student/tasks/result/sorting-result/sorting-result.component';
import {SentenceCompletionResultComponent} from './student/tasks/result/sentence-completion-result/sentence-completion-result.component';
import {SentenceCreationResultComponent} from './student/tasks/result/sentence-creation-result/sentence-creation-result.component';
import {TrueFalseResultComponent} from './student/tasks/result/true-false-result/true-false-result.component';
import {MemoryGameResultComponent} from './student/tasks/result/memory-game-result/memory-game-result.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ExercisesComponent,
    UsersComponent,
    LoginComponent,
    NewExerciseComponent,
    ModalComponent,
    NewTaskComponent,
    GroupingComponent,
    PairingComponent,
    SentenceCompletionComponent,
    SentenceCreationComponent,
    SortingComponent,
    GroupingSortingComponent,
    SentencecompletionGroupingComponent,
    SentencecompletionSortingComponent,
    SentencecreationGroupingComponent,
    SentencecreationSortingComponent,
    SortingGroupingComponent,
    ExerciseTaskListComponent,
    UserResultsComponent,
    ExerciseListComponent,
    NotFoundComponent,
    MyExercisesComponent,
    MyResultsComponent,
    TrueFalseComponent,
    StudentPairingComponent,
    StudentGroupingComponent,
    StudentSortingComponent,
    StudentSentenceCreationComponent,
    StudentSentenceCompletionComponent,
    StudentTrueFalseComponent,
    StudentMemoryGameComponent,
    ExerciseResultComponent,
    PairingResultComponent,
    GroupingResultComponent,
    SortingResultComponent,
    SentenceCompletionResultComponent,
    SentenceCreationResultComponent,
    TrueFalseResultComponent,
    MemoryGameResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [
    DomService,
    ModalService,
    ModalComponent,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    LoginComponent,
    NewTaskComponent,
    NewExerciseComponent,
    ExerciseTaskListComponent,
    ExerciseListComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    NewTaskComponent,
    NewExerciseComponent,
    ExerciseTaskListComponent,
    LoginComponent,
    ModalComponent,
    ExerciseListComponent,
    PairingResultComponent,
    GroupingResultComponent,
    SortingResultComponent,
    SentenceCompletionResultComponent,
    SentenceCreationResultComponent,
    TrueFalseResultComponent,
    MemoryGameResultComponent]
})
export class AppModule {
}
