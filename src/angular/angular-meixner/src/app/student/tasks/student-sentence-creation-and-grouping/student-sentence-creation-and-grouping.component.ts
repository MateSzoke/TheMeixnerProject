import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, Sentence} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCreationResultComponent} from "../result/sentence-creation-result/sentence-creation-result.component";
import {SentenceCreationAndGroupingTask} from "../../../../swagger-api/model/sentenceCreationAndGroupingTask";
import {SentenceCreationAndGroupingTaskRequest} from "../../../../swagger-api/model/sentenceCreationAndGroupingTaskRequest";

@Component({
  selector: 'app-student-sentence-creation-and-grouping',
  templateUrl: './student-sentence-creation-and-grouping.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCreationAndGroupingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCreation: SentenceCreationAndGroupingTask = null
  taskRequest: SentenceCreationAndGroupingTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  groupingAvailable: boolean = false
  sentences: Array<Sentence> = new Array<Sentence>()

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
      this.sentenceCreation = task as SentenceCreationAndGroupingTask
      this.taskRequest = {
        sentenceGroups: this.sentenceCreation.groupTitles.map(title => ({groupTitle: title, sentences: []}))
      }
      this.sentences = this.sentenceCreation.sentenceTitles.map(title => ({sentenceTitle: title, parts: []}))
      this.loaded = true
    })
  }

  setGroupingAvailable(available: boolean) {
    this.groupingAvailable = available
    if (available) {
      this.currentResult = []
      this.taskRequest.sentenceGroups.forEach(group => group.sentences = [])
    }
    if (!available) {
      this.taskRequest.sentenceGroups.forEach(group => group.sentences.forEach(sentence => this.sentences.push(sentence)))
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

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.taskRequest)
  }

  getSentence(sentence: Sentence): string {
    let result = ""
    sentence.parts.map(part => result += ` ${part}`)
    return result
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCreationAndGroupingUsingPOST(this.startedExerciseId, this.taskId, this.taskRequest).subscribe(response => {
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
