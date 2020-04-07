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
import { ExercisesComponent } from './exercises/exercises.component';
import { ExamsComponent } from './exams/exams.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { NewExamComponent } from './new-exam/new-exam.component';
import { ModalComponent } from './modal/modal.component';
import {DomService} from './service/dom.service';
import {ModalService} from './service/modal.service';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { SorrendezesComponent } from './sorrendezes/sorrendezes.component';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    ExamsComponent,
    UsersComponent,
    LoginComponent,
    NewExamComponent,
    ModalComponent,
    NewExerciseComponent,
    SorrendezesComponent
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
        MatSelectModule
    ],
  providers: [DomService, ModalService, ModalComponent,LoginComponent, NewExerciseComponent],
  bootstrap: [AppComponent],
  entryComponents: [NewExerciseComponent, LoginComponent, ModalComponent]
})
export class AppModule { }
