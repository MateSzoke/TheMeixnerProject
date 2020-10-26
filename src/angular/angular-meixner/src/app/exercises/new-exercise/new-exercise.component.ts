import {Component, OnInit} from '@angular/core';
import {ExerciseRequest, ExercisesService, TaskResponse} from '../../../swagger-api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import SubjectEnum = TaskResponse.SubjectEnum;

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  subjects: Array<string> = new Array<string>()
  classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  exercisesForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    subject: [null, [Validators.required]],
    classLevel: [null, Validators.required],
    comment: ["", []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExercisesService
  ) {
  }

  ngOnInit() {
    for (let subject in SubjectEnum) {
      this.subjects.push(SubjectEnumUtil.subjectToString(subject));
    }
  }

  createExercise() {
    if (!this.exercisesForm.valid) {
      return;
    } else {
      const exercise: ExerciseRequest = {
        name: this.exercisesForm.value.name,
        comment: this.exercisesForm.value.comment,
        classLevel: this.exercisesForm.value.classLevel,
        subject: SubjectEnumUtil.stringToSubject(this.exercisesForm.value.subject)
      };
      this.exerciseService.createExercisesUsingPOST(exercise).subscribe();
    }
  }

}
