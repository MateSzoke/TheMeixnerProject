import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, MediaItemRequest} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {GroupingResultComponent} from "../result/grouping-result/grouping-result.component";
import {GroupingAndSortingTask} from "../../../../swagger-api/model/groupingAndSortingTask";
import {GroupingAndSortingTaskRequest} from "../../../../swagger-api/model/groupingAndSortingTaskRequest";

@Component({
  selector: 'app-student-grouping-and-sorting',
  templateUrl: './student-grouping-and-sorting.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentGroupingAndSortingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  grouping: GroupingAndSortingTask = null
  groupingRequest: GroupingAndSortingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  success: boolean
  fail: boolean


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private assignService: AssignService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.grouping = task as GroupingAndSortingTask
      this.groupingRequest = {
        groups: this.grouping.groups.map(group => ({name: group, elements: []}))
      }
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.groupingRequest)
  }

  isMediaItem(request: MediaItemRequest): boolean {
    return request.content?.includes("/files/download")
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

  evaluateTask() {
    this.evaluateService.evaluateGroupingAndSortingUsingPOST(this.startedExerciseId, this.taskId, this.getRequest()).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.groupingRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(GroupingResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

  getRequest(): GroupingAndSortingTaskRequest {
    let request = {...this.groupingRequest}
    request.groups = request.groups.map(group => {
      return {
        name: group.name,
        elements: group.elements.map(element => {
          if (this.isMediaItem(element)) {
            return {mediaItemId: element.mediaItemId}
          } else {
            return {content: element.content}
          }
        })
      }
    })
    return request
  }
}
