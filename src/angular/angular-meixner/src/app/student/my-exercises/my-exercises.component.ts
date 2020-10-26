import {Component, OnInit} from '@angular/core';
import {AssignedExercise} from "../../../swagger-api/model/assignedExercise";
import {AssignService} from "../../../swagger-api";
import {Router} from "@angular/router";
import {ConvertEnum} from "../../model/ConvertEnum";
import {StartedExercise} from "../../../swagger-api/model/startedExercise";
import {Path} from "../../path";
import {MatDialog} from "@angular/material/dialog";
import {ExerciseResultComponent} from "../exercise-result/exercise-result.component";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";

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
      this.exercises.forEach(exercise => {
        // @ts-ignore
        exercise.subject = SubjectEnumUtil.subjectToString(exercise.subject)
      })
      this.loaded = true
    })
  }

  static getNavigationData(startedExercise: StartedExercise) {
    return {
      startedExerciseId: startedExercise.id,
      taskId: startedExercise.nextTask.taskId
    }
  }

  static navigateNextTask(response: StartedExercise, router: Router, dialog: MatDialog) {
    if (response.nextTask == undefined) {
      dialog.open(ExerciseResultComponent, {
        data: {startedExerciseId: response.id}
      })
      let subscription = dialog.afterAllClosed.subscribe(() => {
        router.navigate([Path.STUDENT_RESULTS])
        subscription.unsubscribe()
      })
    } else {
      router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
    }
  }

  solveExercise(exercise: AssignedExercise) {
    this.assignService.startExerciseUsingGET(exercise.id).subscribe(startedExercise => {
      console.log(startedExercise)
      this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(startedExercise.nextTask.type), MyExercisesComponent.getNavigationData(startedExercise)])
    })
  }
}
