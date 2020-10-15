import {Component, OnInit} from '@angular/core';
import {SentenceCreationTask} from "../../../../swagger-api/model/sentenceCreationTask";
import {SentenceCreationTaskRequest} from "../../../../swagger-api/model/sentenceCreationTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {Path} from "../../../path";
import {ConvertEnum} from "../../../model/ConvertEnum";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";

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
      this.sentenceCreation = task as SentenceCreationTask
      this.sentenceCreationRequest = {
        sentences: this.sentenceCreation.sentenceTitles.map(title => ({sentenceTitle: title, parts: []}))
      }
      this.loaded = true
    })
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
      console.log(response)
      if (response.nextTask == undefined) {
        this.router.navigate([Path.STUDENT_EXERCISE_RESULT, {startedExerciseId: this.startedExerciseId}])
      } else {
        this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
      }
    })
  }

}
