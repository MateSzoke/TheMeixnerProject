import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, GroupListItemRequest, MediaItemRequest} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {GroupingResultComponent} from "../result/grouping-result/grouping-result.component";
import {SortingAndGroupingTask} from "../../../../swagger-api/model/sortingAndGroupingTask";
import {SortingAndGroupingTaskRequest} from "../../../../swagger-api/model/sortingAndGroupingTaskRequest";

@Component({
  selector: 'app-student-sorting-and-grouping',
  templateUrl: './student-sorting-and-grouping.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSortingAndGroupingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sortingAndGroupingTask: SortingAndGroupingTask = null
  taskRequest: SortingAndGroupingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  success: boolean
  fail: boolean
  sortingAvailable: boolean = false

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
      this.sortingAndGroupingTask = task as SortingAndGroupingTask
      this.taskRequest = {
        groups: []
      }
      this.loaded = true
    })
  }

  setSortingAvailable(available: boolean) {
    this.sortingAvailable = available
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.taskRequest)
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

  addPairElement() {
    this.taskRequest.groups.push({elements: []})
  }

  evaluateTask() {
    this.evaluateService.evaluateSortingAndGroupingUsingPOST(this.startedExerciseId, this.taskId, this.getRequest()).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.taskRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(GroupingResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

  getRequest(): SortingAndGroupingTaskRequest {
    let request = {...this.taskRequest}
    request.groups = request.groups.map(group => {
      return {
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

  dropGroup(event: CdkDragDrop<Array<GroupListItemRequest>, any>) {
    moveItemInArray(this.taskRequest.groups, event.previousIndex, event.currentIndex)
  }
}
