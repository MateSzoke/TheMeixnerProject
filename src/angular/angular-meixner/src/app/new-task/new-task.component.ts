import {Component, OnInit} from '@angular/core';
import {ComplexTasksService, EasyTasksService, OtherTasksService, TaskResponse} from '../../swagger-api';
import {ModalComponent} from '../modal/modal.component';
import {Observable} from 'rxjs';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectEnumUtil} from "../util/subjectEnumUtil";
import {TypeEnumUtil} from "../util/typeEnumUtil";
import {Router} from "@angular/router";
import {ConvertEnum} from "../model/ConvertEnum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import TypeEnum = TaskResponse.TypeEnum;
import SubjectEnum = TaskResponse.SubjectEnum;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  public types: Array<string>;
  public subjects: Array<string>;
  public classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public classesTo: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public name: string = null;

  newTaskForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required, Validators.minLength(3)]],
    type: [null, Validators.required],
    difficulty: [50, Validators.required],
    classFrom: [null, Validators.required],
    classTo: [null, [Validators.required]],
    subject: [null, [Validators.required]]
  });

  ngOnInit(): void {
    this.types = new Array<string>();
    for (let taskType in TypeEnum) {
      this.types.push(TypeEnumUtil.taskTypeToString(taskType));
    }
    this.subjects = new Array<string>();
    for (let subject in SubjectEnum) {
      this.subjects.push(SubjectEnumUtil.subjectToString(subject));
    }
  }

  constructor(private modalC: ModalComponent,
              private theEasyTasksService: EasyTasksService,
              private complexTasksService: ComplexTasksService,
              private otherTasksService: OtherTasksService,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<NewTaskComponent>) {

  }

  getTaskParams() {
    return {
      title: this.newTaskForm.value.title,
      difficulty: this.newTaskForm.value.difficulty,
      recommendedMinClass: this.newTaskForm.value.classFrom,
      recommendedMaxClass: this.newTaskForm.value.classTo,
      subject: this.newTaskForm.value.subject
    }
  }

  saveData() {
    if (!this.newTaskForm.valid) {
      return
    }
    this.navigateToTaskTypeComponent(TypeEnumUtil.stringToTaskType(this.newTaskForm.value.type))
    this.dialogRef.close()
  }

  private navigateToTaskTypeComponent(taskType: TypeEnum) {
    console.log("navigateToTaskTypeComponent");
    console.log(taskType);

    this.router.navigate([ConvertEnum.convertTypeToRouterLink(taskType), this.getTaskParams()])
  }
}
