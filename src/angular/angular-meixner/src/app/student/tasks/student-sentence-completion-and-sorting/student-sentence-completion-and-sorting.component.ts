import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, SentenceCompletionItem} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
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
  options: Array<string> = new Array<string>()
  sentenceResult: Array<Array<Array<string>>> = new Array<Array<Array<string>>>()
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
      this.sentenceCompletion = task as SentenceCompletionAndSortingTask
      this.sentenceCompletion.options.forEach(option => {
        this.options.push(option)
      })
      this.taskRequest = {
        attempts: this.attempts,
        sentences: new Array<SentenceCompletionItem>()
      }
      this.sentenceCompletion.sentences.forEach(sentence => {
        this.sentenceResult.push(sentence.map(() => []))
        this.taskRequest.sentences.push({
          sentence: sentence,
          options: new Array<string>()
        })
      })
      this.loaded = true
    })
  }

  setSortingAvailable(available: boolean) {
    this.sortingAvailable = available
  }

  getSuccess(index: number): string {
    if (this.currentResult.length != 0 && this.currentResult[index])
      return 'green'
    else if (this.currentResult.length != 0 && !this.currentResult[index])
      return 'red'
    else
      return 'white'
  }

  dropSentence(event: CdkDragDrop<Array<Array<string>>>) {
    moveItemInArray(this.sentenceCompletion.sentences, event.previousIndex, event.currentIndex);
    moveItemInArray(this.sentenceResult, event.previousIndex, event.currentIndex);
    this.refreshTaskRequest()
  }

  drop(event: CdkDragDrop<Array<string>>, isFromAvailable: boolean) {
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
    this.refreshTaskRequest()
  }

  refreshTaskRequest() {
    this.taskRequest.sentences = this.sentenceResult.map(sentence => ({
      sentence: [],
      options: sentence.map(result => {
        if (result.length > 0)
          return result[0]
      }).filter(element => element != undefined)
    }))
    console.log(this.taskRequest)
  }

  evaluateTask() {
    console.log(this.taskRequest)
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
