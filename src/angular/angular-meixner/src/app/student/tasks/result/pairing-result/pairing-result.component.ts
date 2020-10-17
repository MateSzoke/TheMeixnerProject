import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {PairingResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-pairing-result',
  templateUrl: './pairing-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class PairingResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  pairingResult: PairingResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    if (params.startedExercise == undefined) {
      this.pairingResult = params.taskResult
    } else {
      this.startedExercise = params.startedExercise
      this.pairingResult = this.startedExercise.taskResult.taskResult as PairingResponse
    }
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getPercentageText(): string {
    if (isNaN(this.getPercentage())) {
      return ""
    } else {
      return `${Math.round(this.getPercentage())} %`
    }
  }

  getPercentage(): number {
    if (this.startedExercise == undefined) {
      return NaN
    } else {
      return this.startedExercise.taskResult.resultPercentage
    }
  }

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
