import {Component, OnInit} from '@angular/core';
import {SentenceCompletionTask} from "../../../../swagger-api/model/sentenceCompletionTask";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCompletionTaskRequest} from "../../../../swagger-api/model/sentenceCompletionTaskRequest";
import {MatDialog} from "@angular/material/dialog";
import {SentenceCompletionResultComponent} from "../result/sentence-completion-result/sentence-completion-result.component";

@Component({
  selector: 'app-student-sentence-completion',
  templateUrl: './student-sentence-completion.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCompletionComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCompletion: SentenceCompletionTask = null
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
      this.sentenceCompletion = task as SentenceCompletionTask
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
    this.evaluateService.evaluateSentenceCompletionUsingPOST(this.startedExerciseId, this.taskId, this.createTaskRequest()).subscribe(response => {
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

  private createTaskRequest(): SentenceCompletionTaskRequest {
    return {
      attempts: this.attempts,
      options: this.sentenceResult.map(result => {
        if (result.length > 0)
          return result[0]
        else return ""
      })
    }
  }

}

