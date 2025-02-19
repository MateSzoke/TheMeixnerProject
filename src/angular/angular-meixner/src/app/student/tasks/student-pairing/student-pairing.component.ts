import {Component, OnInit} from '@angular/core';
import {PairingTask} from "../../../../swagger-api/model/pairingTask";
import {PairingTaskRequest} from "../../../../swagger-api/model/pairingTaskRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService, MediaItemRequest} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {PairingResultComponent} from "../result/pairing-result/pairing-result.component";
import {MatDialog} from "@angular/material/dialog";

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
      this.pairing = task as PairingTask
      this.pairingRequest = {
        pairs: []
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
    console.log(this.pairingRequest)
  }

  isMediaItem(request: MediaItemRequest): boolean {
    return request.content?.includes("/files/download")
  }

  addPairElement() {
    this.pairingRequest.pairs.push({pair: []})
  }

  evaluateTask() {
    this.evaluateService.evaluatePairingUsingPOST(this.startedExerciseId, this.taskId, this.getRequest()).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.pairingRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(PairingResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

  getRequest(): PairingTaskRequest {
    let request = {...this.pairingRequest}
    request.pairs = request.pairs.map(pairElement => {
      return {
        pair: pairElement.pair.map(element => {
          if (this.isMediaItem(element)) {
            return {mediaItemId: element.mediaItemId}
          } else {
            return {content: element.content}
          }
        })
      }
    })
    return request
  }
}
