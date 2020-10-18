import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultsService} from "../../../swagger-api";
import {ExerciseResult} from "../../../swagger-api/model/exerciseResult";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConvertEnum} from "../../model/ConvertEnum";

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['../tasks/result/student-task-result.scss']
})
export class ExerciseResultComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  exerciseResult: ExerciseResult

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultsService,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
  }

  ngOnInit(): void {
    if (this.params.exerciseResult != undefined) {
      this.exerciseResult = this.params.exerciseResult
      this.loaded = true
    } else {
      this.startedExerciseId = this.params.startedExerciseId
      this.resultService.getSolvedExerciseResultsUsingGET(this.startedExerciseId).subscribe(result => {
        this.exerciseResult = result as ExerciseResult
        this.exerciseResult.taskResults.forEach(task => {
          // @ts-ignore
          task.taskResult.type = ConvertEnum.convertType(task.taskResult.type)
        })
        this.loaded = true
      })
    }
  }

  getPercentage(): number {
    if (this.exerciseResult == undefined) {
      return NaN
    } else {
      return this.exerciseResult.resultPercentage
    }
  }

  getPercentageText(): string {
    if (isNaN(this.getPercentage())) {
      return "-"
    } else {
      return `${Math.round(this.getPercentage())} %`
    }
  }

  getPercentageTextByValue(value: number): string {
    if (isNaN(value)) {
      return "-"
    } else {
      return `${Math.round(value)} %`
    }
  }

}
