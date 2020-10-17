import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {SortingResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-sorting-result',
  templateUrl: './sorting-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class SortingResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  sortingResponse: SortingResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    if (params.startedExercise == undefined) {
      this.sortingResponse = params.taskResult
    } else {
      this.startedExercise = params.startedExercise
      this.sortingResponse = this.startedExercise.taskResult.taskResult as SortingResponse
    }
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getPercentageText(): string {
    if (isNaN(this.getPercentage())) {
      return ""
    } else {
      return `${Math.round(this.getPercentage())} %`
    }
  }

  getPercentage(): number {
    if (this.startedExercise == undefined) {
      return NaN
    } else {
      return this.startedExercise.taskResult.resultPercentage
    }
  }

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
