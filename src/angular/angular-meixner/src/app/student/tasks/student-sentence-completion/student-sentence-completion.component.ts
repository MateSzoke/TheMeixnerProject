import {Component, OnInit} from '@angular/core';
import {SentenceCompletionTask} from "../../../../swagger-api/model/sentenceCompletionTask";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";
import {SentenceCompletionTaskRequest} from "../../../../swagger-api/model/sentenceCompletionTaskRequest";
import {MatDialog} from "@angular/material/dialog";
import {GroupingResultComponent} from "../result/grouping-result/grouping-result.component";

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

  drop(event: CdkDragDrop<Array<string>>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCompletionUsingPOST(this.startedExerciseId, this.taskId, this.createTaskRequest()).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(GroupingResultComponent, {
          data: {startedExercise: response}
        })
        let subscription = this.dialog.afterAllClosed.subscribe(() => {
          MyExercisesComponent.navigateNextTask(response, this.router, this.dialog)
          subscription.unsubscribe()
        })
      }
      this.loaded = true
    })
  }

  private createTaskRequest(): SentenceCompletionTaskRequest {
    return {
      attempts: this.attempts,
      options: this.sentenceResult.map(result => result[0])
    }
  }

}
