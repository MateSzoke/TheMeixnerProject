import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {SentenceCompletionResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ExerciseResultComponent} from "../../../exercise-result/exercise-result.component";
import {Path} from "../../../../path";
import {MyExercisesComponent} from "../../../my-exercises/my-exercises.component";

@Component({
  selector: 'app-sentence-completion-result',
  templateUrl: './sentence-completion-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class SentenceCompletionResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  sentenceCompletion: SentenceCompletionResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {

    if (params.startedExercise == undefined) {
      this.sentenceCompletion = params.taskResult
    } else {
      this.startedExercise = params.startedExercise
      this.sentenceCompletion = this.startedExercise.taskResult.taskResult as SentenceCompletionResponse
    }
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getAttemptsText(): string {
    if (isNaN(this.getAttempts())) {
      return ""
    } else {
      return `${Math.round(this.getAttempts() * 10) / 10}`
    }
  }

  getAttempts(): number {
    if (this.startedExercise == undefined) {
      return NaN
    } else {
      return this.startedExercise.taskResult.attempts
    }
  }

  navigateToNextTask() {
    MyExercisesComponent.navigateNextTask(this.startedExercise, this.router, this.dialog)
  }

  finishExercise() {
    let dialogRef = this.dialog.open(ExerciseResultComponent, {
      data: {startedExerciseId: this.startedExercise.id}
    })
    let subscription = dialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll()
      this.router.navigate([Path.STUDENT_RESULTS])
      subscription.unsubscribe()
    })
  }
}
