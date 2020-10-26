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
  resultsButtonVisible: boolean = false

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultsService,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
  }

  ngOnInit(): void {
    if (this.params.exerciseResult != undefined) {
      this.exerciseResult = this.params.exerciseResult
      this.resultsButtonVisible = false
      this.loaded = true
    } else {
      this.startedExerciseId = this.params.startedExerciseId
      this.resultService.getSolvedExerciseResultsUsingGET(this.startedExerciseId).subscribe(result => {
        this.exerciseResult = result as ExerciseResult
        this.exerciseResult.taskResults.forEach(task => {
          // @ts-ignore
          task.taskResult.type = ConvertEnum.convertType(task.taskResult.type)
        })
        this.resultsButtonVisible = true
        this.loaded = true
      })
    }
  }
}
