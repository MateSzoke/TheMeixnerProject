import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCreationResultComponent} from "../result/sentence-creation-result/sentence-creation-result.component";
import {SentenceCreationAndSortingTask} from "../../../../swagger-api/model/sentenceCreationAndSortingTask";
import {SentenceCreationAndSortingTaskRequest} from "../../../../swagger-api/model/sentenceCreationAndSortingTaskRequest";

@Component({
  selector: 'app-student-sentence-creation-and-sorting',
  templateUrl: './student-sentence-creation-and-sorting.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCreationAndSortingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCreationAndSortingTask: SentenceCreationAndSortingTask = null
  taskRequest: SentenceCreationAndSortingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  sortingAvailable: boolean = false

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
      this.sentenceCreationAndSortingTask = task as SentenceCreationAndSortingTask
      this.taskRequest = {
        sentences: []
      }
      this.loaded = true
    })
  }

  setSortingAvailable(available: boolean) {
    this.sortingAvailable = available
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

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.taskRequest)
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCreationAndSortingUsingPOST(this.startedExerciseId, this.taskId, this.taskRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.taskRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(SentenceCreationResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }
}
