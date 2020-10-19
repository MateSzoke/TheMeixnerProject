import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {SentenceCompletionResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
