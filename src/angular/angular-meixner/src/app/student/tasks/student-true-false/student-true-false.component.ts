import {Component, OnInit} from '@angular/core';
import {TrueFalseTask} from "../../../../swagger-api/model/trueFalseTask";
import {TrueFalseTaskRequest} from "../../../../swagger-api/model/trueFalseTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {Path} from "../../../path";
import {ConvertEnum} from "../../../model/ConvertEnum";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";

@Component({
  selector: 'app-student-true-false',
  templateUrl: './student-true-false.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentTrueFalseComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  trueFalse: TrueFalseTask = null
  trueFalseRequest: TrueFalseTaskRequest = null

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
      this.trueFalse = task as TrueFalseTask
      this.trueFalseRequest = {
        trueItems: [],
        falseItems: []
      }
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.trueFalseRequest)
  }

  evaluateTask() {
    this.evaluateService.evaluateTrueFalseUsingPOST(this.startedExerciseId, this.taskId, this.trueFalseRequest).subscribe(response => {
      console.log(response)
      if (response.nextTask == undefined) {
        this.router.navigate([Path.STUDENT_EXERCISE_RESULT, {startedExerciseId: this.startedExerciseId}])
      } else {
        this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
      }
    })
  }
}
