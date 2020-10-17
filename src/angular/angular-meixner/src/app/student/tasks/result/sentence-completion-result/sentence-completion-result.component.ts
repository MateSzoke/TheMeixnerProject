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
    this.startedExercise = params.startedExercise
    this.sentenceCompletion = this.startedExercise.taskResult.taskResult as SentenceCompletionResponse
    this.sentenceCompletion.options.forEach(option => {
      this.sentenceCompletion.sentence = this.sentenceCompletion.sentence.replace("%s", option)
    })
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getPercentage(): string {
    if (isNaN(this.startedExercise.taskResult.resultPercentage)) {
      return "-"
    } else {
      return `${Math.round(this.startedExercise.taskResult.resultPercentage)} %`
    }
  }

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
