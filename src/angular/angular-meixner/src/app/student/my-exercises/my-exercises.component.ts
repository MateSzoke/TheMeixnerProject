import {Component, OnInit} from '@angular/core';
import {AssignedExercise} from "../../../swagger-api/model/assignedExercise";
import {AssignService} from "../../../swagger-api";
import {Router} from "@angular/router";
import {ConvertEnum} from "../../model/ConvertEnum";

@Component({
  selector: 'app-my-exercises',
  templateUrl: './my-exercises.component.html',
  styleUrls: ['./my-exercises.component.scss']
})
export class MyExercisesComponent implements OnInit {

  loaded: boolean = false
  exercises: Array<AssignedExercise> = new Array<AssignedExercise>()

  constructor(
    private assignService: AssignService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.assignService.getMyExercisesUsingGET().subscribe(exercises => {
      this.exercises = exercises
      this.loaded = true
    })
  }

  solveExercise(exercise: AssignedExercise) {
    this.assignService.getTasksByExerciseIdUsingGET(exercise.id).subscribe(tasks => {
      console.log(tasks)
      this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(tasks[0].type), tasks[0]])
    })
  }
}
