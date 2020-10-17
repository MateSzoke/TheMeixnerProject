import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {SentenceCreationResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-sentence-creation-result',
  templateUrl: './sentence-creation-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class SentenceCreationResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  sentenceCreation: SentenceCreationResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.startedExercise = params.startedExercise
    this.sentenceCreation = this.startedExercise.taskResult.taskResult as SentenceCreationResponse
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
