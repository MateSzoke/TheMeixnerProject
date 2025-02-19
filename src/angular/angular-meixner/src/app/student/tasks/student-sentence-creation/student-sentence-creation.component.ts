import {Component, OnInit} from '@angular/core';
import {SentenceCreationTask} from "../../../../swagger-api/model/sentenceCreationTask";
import {SentenceCreationTaskRequest} from "../../../../swagger-api/model/sentenceCreationTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {SentenceCreationResultComponent} from "../result/sentence-creation-result/sentence-creation-result.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-student-sentence-creation',
  templateUrl: './student-sentence-creation.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentSentenceCreationComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCreation: SentenceCreationTask = null
  sentenceCreationRequest: SentenceCreationTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()

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
      this.sentenceCreation = task as SentenceCreationTask
      this.sentenceCreationRequest = {
        sentences: this.sentenceCreation.sentenceTitles.map(title => ({sentenceTitle: title, parts: []}))
      }
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

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.sentenceCreationRequest)
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCreationUsingPOST(this.startedExerciseId, this.taskId, this.sentenceCreationRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.sentenceCreationRequest.attempts = response.taskResult.attempts
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
