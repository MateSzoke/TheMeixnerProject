import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupingResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grouping-result',
  templateUrl: './grouping-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class GroupingResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  groupingResult: GroupingResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.startedExercise = params.startedExercise
    this.groupingResult = this.startedExercise.taskResult.taskResult as GroupingResponse
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
