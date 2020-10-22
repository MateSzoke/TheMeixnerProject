import {Component, OnInit} from '@angular/core';
import {ExerciseRequest, ExercisesService} from '../../../swagger-api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {

  exercisesForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    comment: ["", []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExercisesService
  ) {
  }

  ngOnInit() {
  }

  createExercise() {
    if (!this.exercisesForm.valid) {
      return;
    } else {
      const exercise: ExerciseRequest = {
        name: this.exercisesForm.value.name,
        comment: this.exercisesForm.value.comment
      };
      this.exerciseService.createExercisesUsingPOST(exercise).subscribe();
    }
  }

}
