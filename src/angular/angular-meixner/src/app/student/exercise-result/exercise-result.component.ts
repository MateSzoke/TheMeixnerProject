import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultsService} from "../../../swagger-api";

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.scss']
})
export class ExerciseResultComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null

  // exerciseResult: ExerciseResult

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultsService
  ) {
  }

  ngOnInit(): void {
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    // this.resultService.getExerciseResultByIdUsingGET(this.startedExerciseId).subscribe(result => {
    //   this.exerciseResult = result as ExerciseResult
    this.loaded = true
    //})
  }

}
