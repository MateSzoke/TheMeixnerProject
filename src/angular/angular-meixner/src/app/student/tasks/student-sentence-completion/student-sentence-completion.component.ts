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
  sentenceResult: Array<Array<ElementUI>> = new Array<Array<ElementUI>>()
  options: Array<ElementUI> = new Array<ElementUI>()

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
        this.options.push(new ElementUI(true, option))
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

  drop(event: CdkDragDrop<Array<ElementUI>>, isFromAvailable: boolean) {
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
      options: this.sentenceResult.map(result => {
        if (result.length > 0)
          return result[0].value
        else return ""
      })
    }
  }

}

class ElementUI {
  isAvailable: boolean
  value: string

  constructor(isAvailable: boolean, value: string) {
    this.isAvailable = isAvailable
    this.value = value
  }
}
