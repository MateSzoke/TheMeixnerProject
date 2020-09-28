import {Component, Inject, OnInit} from '@angular/core';
import {ExercisesService, UserResponse} from "../../../swagger-api";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DateUtils} from "../../util/date";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  public user: UserResponse;
  public exercises: Array<ExerciseUI> = new Array<ExerciseUI>();
  public exercisesLoaded = false;

  constructor(
    private exerciseService: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.user = params.user
  }

  ngOnInit(): void {
    this.exerciseService.getMyExercisesUsingGET().subscribe(exercises => {
        exercises.forEach(exercise => {
          this.exercises.push(new ExerciseUI(exercise.id, exercise.name, exercise.comment, exercise.lastModified));
        });
        this.exercisesLoaded = true;
      },
      error => {

      },
      () => {
      });
  }

  saveExercises() {
    this.exercises.forEach(exercise => {
      if (exercise.checked) {
        // TODO uncomment if backend ready this.exerciseService.addTaskToExercisesUsingPOST(this.user.id, exercise.id).subscribe();
      }
    });
  }

}

class ExerciseUI {
  id: number;
  name: string;
  comment: string;
  lastModified: string;
  checked: boolean = false;

  constructor(id: number, name: string, comment: string, lastModified: Date) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.lastModified = DateUtils.getFormattedDate(lastModified);
  }

}
