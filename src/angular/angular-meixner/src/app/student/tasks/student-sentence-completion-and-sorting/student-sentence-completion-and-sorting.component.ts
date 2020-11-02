import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, SentenceCompletionItem} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCompletionResultComponent} from "../result/sentence-completion-result/sentence-completion-result.component";
import {SentenceCompletionAndSortingTask} from "../../../../swagger-api/model/sentenceCompletionAndSortingTask";
import {SentenceCompletionAndSortingTaskRequest} from "../../../../swagger-api/model/sentenceCompletionAndSortingTaskRequest";
import {MatSelectChange} from "@angular/material/select";

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
  sorting: Array<number> = new Array<number>()
  sortingView: Array<number> = new Array<number>()

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
        attempts: 0,
        sentences: new Array<SentenceCompletionItem>()
      }
      let i = 1
      this.sentenceCompletion.sentences.forEach(sentence => {
        this.sorting.push(i)
        this.sortingView.push(i)
        i++
        this.sentenceResult.push(sentence.map(() => []))
        this.taskRequest.sentences.push({
          sentence: sentence,
          options: new Array<string>()
        })
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

  dropSentence(event: CdkDragDrop<Array<Array<string>>>) {
    moveItemInArray(this.sentenceCompletion.sentences, event.previousIndex, event.currentIndex);
    console.log(this.sentenceCompletion)
    console.log(this.taskRequest)
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
    this.getTaskRequest()
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

  getTaskRequest() {
    let sentences = this.taskRequest.sentences
    let i = 0
    console.log(sentences)
    sentences.forEach(() => {
      this.taskRequest.sentences[i] = sentences[this.sorting[i] - 1]
      i++
    })
  }

  sortingChange(event: MatSelectChange, index: number) {
    this.sorting[index] = event.value
  }

  getResult(): string {
    let i = 1
    let result = ""
    this.currentResult.forEach(success => {
      if (success)
        result += `${i}, `
      i++
    })
    return result
  }
}
