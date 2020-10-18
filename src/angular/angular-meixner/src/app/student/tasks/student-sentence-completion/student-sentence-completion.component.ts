import {Component, OnInit} from '@angular/core';
import {SentenceCompletionTask} from "../../../../swagger-api/model/sentenceCompletionTask";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Path} from "../../../path";
import {ConvertEnum} from "../../../model/ConvertEnum";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";
import {SentenceCompletionTaskRequest} from "../../../../swagger-api/model/sentenceCompletionTaskRequest";

@Component({
  selector: 'app-student-sentence-completion',
  templateUrl: './student-sentence-completion.component.html',
  styleUrls: ['./student-sentence-completion.component.scss']
})
export class StudentSentenceCompletionComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sentenceCompletion: SentenceCompletionTask = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private assignService: AssignService
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.sentenceCompletion = task as SentenceCompletionTask
      this.sentenceCompletion.sentence = this.sentenceCompletion.sentence.split("%s").join("_____________")
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sentenceCompletion.options, event.previousIndex, event.currentIndex);
    console.log(this.sentenceCompletion)
  }

  evaluateTask() {
    this.evaluateService.evaluateSentenceCompletionUsingPOST(this.startedExerciseId, this.taskId, this.createTaskRequest()).subscribe(response => {
      console.log(response)
      if (response.nextTask == undefined) {
        this.router.navigate([Path.STUDENT_EXERCISE_RESULT, {startedExerciseId: this.startedExerciseId}])
      } else {
        this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
      }
    })
  }

  private createTaskRequest(): SentenceCompletionTaskRequest {
    return {
      options: this.sentenceCompletion.options
    }
  }

}
