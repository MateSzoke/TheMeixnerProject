import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCompletionResultComponent} from "../result/sentence-completion-result/sentence-completion-result.component";
import {SentenceCompletionAndSortingTask} from "../../../../swagger-api/model/sentenceCompletionAndSortingTask";
import {SentenceCompletionAndSortingTaskRequest} from "../../../../swagger-api/model/sentenceCompletionAndSortingTaskRequest";

@Component({
  selector: 'app-student-sentence-completion-and-sorting',
  templateUrl: './student-sentence-completion-and-sorting.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCompletionAndSortingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCompletion: SentenceCompletionAndSortingTask = null
  taskRequest: SentenceCompletionAndSortingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  attempts: number = 0
  sentenceResult: Array<Array<string>> = new Array<Array<string>>()
  options: Array<string> = new Array<string>()

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
      this.sentenceCompletion = task as SentenceCompletionAndSortingTask
      this.sentenceCompletion.options.forEach(option => {
        this.options.push(option)
      })
      this.sentenceCompletion.options.forEach(() => {
        this.sentenceResult.push([])
      })
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

  drop(event: CdkDragDrop<Array<string>>, isFromAvailable: boolean) {
    console.log(event)
    console.log(isFromAvailable)
    let fromData = event.previousContainer.data
    let toData = event.container.data
    let fromIndex = event.previousIndex
    let toIndex = event.currentIndex
    if (event.container.data.length >= 1 && !isFromAvailable) {
      transferArrayItem(toData, fromData, 0, 0);
      transferArrayItem(fromData, toData, 2, 1);
    } else {
      transferArrayItem(fromData, toData, fromIndex, toIndex);
    }
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCompletionAndSortingUsingPOST(this.startedExerciseId, this.taskId, this.taskRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(SentenceCompletionResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }
}
