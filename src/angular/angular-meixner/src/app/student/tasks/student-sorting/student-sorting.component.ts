import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SortingTaskRequest} from "../../../../swagger-api/model/sortingTaskRequest";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {SortingTask} from "../../../../swagger-api/model/sortingTask";
import {SortingResultComponent} from "../result/sorting-result/sorting-result.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-student-sorting',
  templateUrl: './student-sorting.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSortingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sorting: SortingTask = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  attempts: number = 0

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
      this.sorting = task as SortingTask
      this.loaded = true
    })
  }

  getSuccess(): Boolean {
    if (this.currentResult.length != 0) {
      let allSuccess = true
      this.currentResult.forEach(result => {
        if (!result) allSuccess = false
      })
      return allSuccess
    } else
      return false
  }

  getFail(): Boolean {
    if (this.currentResult.length != 0)
      return !this.getSuccess()
    else
      return false
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sorting.elements, event.previousIndex, event.currentIndex);
    console.log(this.sorting.elements)
  }

  evaluateTask() {
    this.evaluateService.evaluateSortingUsingPOST(this.startedExerciseId, this.taskId, this.createTaskRequest()).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(SortingResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

  private createTaskRequest(): SortingTaskRequest {
    return {
      attempts: this.attempts,
      elements: this.sorting.elements.map(element => {
        if (element.type == 'FILE')
          return {mediaItemId: element.mediaItemId}
        else return {content: element.content}
      })
    }
  }

}
