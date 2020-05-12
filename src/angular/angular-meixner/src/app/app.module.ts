import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TasksComponent } from './tasks/tasks.component';
import { ExamsComponent } from './exams/exams.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { ModalComponent } from './modal/modal.component';
import {DomService} from './service/dom.service';
import {ModalService} from './service/modal.service';
import { NewTaskComponent } from './new-task/new-task.component';
import { SorrendezesComponent } from './exercise_types/sorrendezes/sorrendezes.component';
import { GroupingComponent } from './exercise_types/grouping/grouping.component';
import { PairingComponent } from './exercise_types/pairing/pairing.component';
import { SentenceCompletionComponent } from './exercise_types/sentence-completion/sentence-completion.component';
import { SentenceCreationComponent } from './exercise_types/sentence-creation/sentence-creation.component';
import { SortingComponent } from './exercise_types/sorting/sorting.component';
import { GroupingSortingComponent } from './exercise_types/grouping-sorting/grouping-sorting.component';
import { SentencecompletionGroupingComponent } from './exercise_types/sentencecompletion-grouping/sentencecompletion-grouping.component';
import { SentencecompletionSortingComponent } from './exercise_types/sentencecompletion-sorting/sentencecompletion-sorting.component';
import { SentencecreationGroupingComponent } from './exercise_types/sentencecreation-grouping/sentencecreation-grouping.component';
import { SentencecreationSortingComponent } from './exercise_types/sentencecreation-sorting/sentencecreation-sorting.component';
import { SortingGroupingComponent } from './exercise_types/sorting-grouping/sorting-grouping.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpInterceptorService} from "./service/http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ExamsComponent,
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
    SortingGroupingComponent
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
    LoginComponent, NewTaskComponent],
  bootstrap: [AppComponent],
  entryComponents: [NewTaskComponent, LoginComponent, ModalComponent]
})
export class AppModule { }
