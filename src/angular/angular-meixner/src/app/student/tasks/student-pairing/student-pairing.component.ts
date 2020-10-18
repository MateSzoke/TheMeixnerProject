import {Component, OnInit} from '@angular/core';
import {PairingTask} from "../../../../swagger-api/model/pairingTask";
import {PairingTaskRequest} from "../../../../swagger-api/model/pairingTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {Path} from "../../../path";
import {ConvertEnum} from "../../../model/ConvertEnum";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";

@Component({
  selector: 'app-student-pairing',
  templateUrl: './student-pairing.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentPairingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  pairing: PairingTask = null
  pairingRequest: PairingTaskRequest = null

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
      this.pairing = task as PairingTask
      this.pairingRequest = {
        pairs: []
      }
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.pairingRequest)
  }

  addPairElement() {
    this.pairingRequest.pairs.push({pair: []})
  }

  evaluateTask() {
    this.evaluateService.evaluatePairingUsingPOST(this.startedExerciseId, this.taskId, this.pairingRequest).subscribe(response => {
      console.log(response)
      if (response.nextTask == undefined) {
        this.router.navigate([Path.STUDENT_EXERCISE_RESULT, {startedExerciseId: this.startedExerciseId}])
      } else {
        this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
      }
    })
  }
}
