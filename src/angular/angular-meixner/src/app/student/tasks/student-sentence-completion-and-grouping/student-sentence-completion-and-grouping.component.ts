import {Component, OnInit} from '@angular/core';
import {AssignService, EvaluateService, SentenceCompletionItem} from "../../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCreationResultComponent} from "../result/sentence-creation-result/sentence-creation-result.component";
import {SentenceCompletionAndGroupingTask} from "../../../../swagger-api/model/sentenceCompletionAndGroupingTask";
import {SentenceCompletionAndGroupingTaskRequest} from "../../../../swagger-api/model/sentenceCompletionAndGroupingTaskRequest";

@Component({
  selector: 'app-student-sentence-completion-and-grouping',
  templateUrl: './student-sentence-completion-and-grouping.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCompletionAndGroupingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCompletion: SentenceCompletionAndGroupingTask = null
  taskRequest: SentenceCompletionAndGroupingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  groupingAvailable: boolean = false
  sentenceResult: Array<Array<Array<string>>> = new Array<Array<Array<string>>>()
  sentenceItems: Array<SentenceCompletionItem> = new Array<SentenceCompletionItem>()

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
      this.sentenceCompletion = task as SentenceCompletionAndGroupingTask
      this.taskRequest = {
        sentenceGroups: this.sentenceCompletion.groupTitles.map(title => ({groupTitle: title, sentences: []}))
      }
      this.sentenceCompletion.sentences.forEach(sentence => {
        this.sentenceResult.push(sentence.map(() => []))
      })
      this.loaded = true
    })
  }

  setGroupingAvailable(available: boolean) {
    this.groupingAvailable = available
    if (available) {
      this.taskRequest.sentenceGroups.forEach(group => group.sentences = [])
      this.currentResult = []
    }
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
    this.refreshSentenceItems()
  }

  refreshSentenceItems() {
    let i = -1
    this.sentenceItems = this.sentenceResult.map(options => {
      i++
      return {
        sentence: this.sentenceCompletion.sentences[i],
        options: options.map(result => {
          if (result.length > 0)
            return result[0]
        }).filter(element => element != undefined)
      }
    })
    console.log(this.sentenceItems)
  }

  dropSentence(event: CdkDragDrop<Array<SentenceCompletionItem>>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  getSentence(sentenceItem: SentenceCompletionItem): string {
    let result = ""
    let i = 0
    sentenceItem.sentence.forEach(sentencePart => {
      result += `${sentencePart} `
      if (i < sentenceItem.options.length)
        result += ` ${sentenceItem.options[i]} `
      i++
    })
    return result
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCompletionAndGroupingUsingPOST(this.startedExerciseId, this.taskId, this.taskRequest).subscribe(response => {
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
