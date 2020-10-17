import {Component, Inject, OnInit} from '@angular/core';
import {StartedExercise} from "../../../../../swagger-api/model/startedExercise";
import {MemoryGameResponse} from "../../../../../swagger-api";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-memory-game-result',
  templateUrl: './memory-game-result.component.html',
  styleUrls: ['../student-task-result.scss']
})
export class MemoryGameResultComponent implements OnInit {
  startedExercise: StartedExercise = null
  memoryGameResult: MemoryGameResponse = null
  loaded: boolean = false

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.startedExercise = params.startedExercise
    this.memoryGameResult = this.startedExercise.taskResult.taskResult as MemoryGameResponse
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getPercentage(): string {
    if (isNaN(this.startedExercise.taskResult.resultPercentage)) {
      return "-"
    } else {
      return `${Math.round(this.startedExercise.taskResult.resultPercentage)} %`
    }
  }

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
