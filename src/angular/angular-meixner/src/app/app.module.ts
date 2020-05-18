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
import {SorrendezesComponent} from './task_types/sorrendezes/sorrendezes.component';
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
    SorrendezesComponent,
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
    ExerciseTaskListComponent
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
        MatProgressSpinnerModule
    ],
  providers: [DomService, ModalService, ModalComponent,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    LoginComponent, NewTaskComponent, NewExerciseComponent, ExerciseTaskListComponent],
  bootstrap: [AppComponent],
  entryComponents: [NewTaskComponent, NewExerciseComponent, ExerciseTaskListComponent, LoginComponent, ModalComponent]
})
export class AppModule { }
