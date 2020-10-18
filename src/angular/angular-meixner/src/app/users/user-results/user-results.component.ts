import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExercisesResponse, ResultsService, StudentResponse} from "../../../swagger-api";
import {ExerciseListComponent} from "../excercise-list/exercise-list.component";
import {MatDialog} from "@angular/material/dialog";
import {StartedExercise} from "../../../swagger-api/model/startedExercise";

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.scss']
})
export class UserResultsComponent implements OnInit {

  studentLoaded: boolean = false
  student: StudentResponse
  userId: number
  classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  exerciseResults: Array<StartedExercise> = new Array<StartedExercise>()

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap
    this.userId = Number.parseInt(params.get("userId"))
    this.resultsService.getStudentByIdUsingGET(this.userId).subscribe(student => {
      this.student = student
      this.resultsService.getResultsByUserIdUsingGET(student.user.id).subscribe(exerciseResults => {
        this.exerciseResults = exerciseResults
        this.studentLoaded = true
      })
    })
  }

  showExerciseList() {
    this.dialog.open(ExerciseListComponent, {
      data: {user: this.student.user}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadExercises()
    })
  }

  deleteExerciseFromUser(exerciseId: number) {
    this.resultsService.removeExercisesFromUserUsingDELETE(exerciseId, this.userId).subscribe(() => {
      this.loadExercises()
    })
  }

  openExerciseResults(exercise: ExercisesResponse) {
    console.log(`TODO open ${exercise.name} results to ${this.student.user.username}`)
  }

  loadExercises() {
    this.resultsService.getStudentByIdUsingGET(this.userId).subscribe(student => {
      this.student = student
    })
  }

  changeClass() {
    this.resultsService.changeClassLevelByUserIdUsingPOST(this.student.classLevel, this.userId).subscribe()
  }
}
