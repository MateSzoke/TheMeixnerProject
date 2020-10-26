import {Component, OnInit} from '@angular/core';
import {TrueFalseTask} from "../../../../swagger-api/model/trueFalseTask";
import {TrueFalseTaskRequest} from "../../../../swagger-api/model/trueFalseTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, MediaItemRequest} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {TrueFalseResultComponent} from "../result/true-false-result/true-false-result.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-student-true-false',
  templateUrl: './student-true-false.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentTrueFalseComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  trueFalse: TrueFalseTask = null
  trueFalseRequest: TrueFalseTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private dialog: MatDialog,
    private assignService: AssignService
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.trueFalse = task as TrueFalseTask
      this.trueFalseRequest = {
        trueItems: [],
        falseItems: []
      }
      this.loaded = true
    })
  }

  getSuccess(index: number): Boolean {
    if (this.currentResult.length != 0)
      return this.currentResult[index]
    else
      return false
  }

  getFail(index: number): Boolean {
    if (this.currentResult.length != 0)
      return !this.currentResult[index]
    else
      return false
  }

  isMediaItem(request: MediaItemRequest): boolean {
    return request.content.includes("/files/download")
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.trueFalseRequest)
  }

  evaluateTask() {
    this.evaluateService.evaluateTrueFalseUsingPOST(this.startedExerciseId, this.taskId, this.trueFalseRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.trueFalseRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(TrueFalseResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }
}
