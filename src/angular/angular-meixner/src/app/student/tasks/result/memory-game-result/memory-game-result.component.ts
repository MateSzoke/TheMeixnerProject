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
    if (params.startedExercise == undefined) {
      this.memoryGameResult = params.taskResult
    } else {
      this.startedExercise = params.startedExercise
      this.memoryGameResult = this.startedExercise.taskResult.taskResult as MemoryGameResponse
    }
    this.loaded = true
  }

  ngOnInit(): void {
  }

  getAttemptsText(): string {
    if (isNaN(this.getAttempts())) {
      return ""
    } else {
      return `${Math.round(this.getAttempts() * 10) / 10}`
    }
  }

  getAttempts(): number {
    if (this.startedExercise == undefined) {
      return NaN
    } else {
      return this.startedExercise.taskResult.attempts
    }
  }

  finishExercise() {
    // TODO navigate to exercise-result.component
    this.router.navigate([])
  }
}
