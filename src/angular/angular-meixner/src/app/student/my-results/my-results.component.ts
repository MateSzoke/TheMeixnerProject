import {Component, OnInit} from '@angular/core';
import {ResultsService} from "../../../swagger-api";
import {Router} from "@angular/router";
import {ExerciseResult} from "../../../swagger-api/model/exerciseResult";
import {TaskResultResponse} from "../../../swagger-api/model/taskResultResponse";

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss']
})
export class MyResultsComponent implements OnInit {
  loaded: boolean = false
  exercises: Array<ExerciseResult> = []

  constructor(
    private resultsService: ResultsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resultsService.getMyResultsUsingGET().subscribe(exercises => {
      this.exercises = exercises
      this.loaded = true
    })
  }


  showExerciseResult(task: TaskResultResponse) {

  }
}
