import {Component, OnInit} from '@angular/core';
import {ComplexTasksService, EasyTasksService, OtherTasksService, TaskResponse} from '../../swagger-api';
import {ModalComponent} from '../modal/modal.component';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectEnumUtil} from "../util/subjectEnumUtil";
import {TypeEnumUtil} from "../util/typeEnumUtil";
import {Router} from "@angular/router";
import {ConvertEnum} from "../model/ConvertEnum";
import TypeEnum = TaskResponse.TypeEnum;
import SubjectEnum = TaskResponse.SubjectEnum;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  submitted = false;

  public types: Array<string>;
  public subjects: Array<string>;
  public classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public classesTo: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public name: string = null;

  public newTaskModel: NewTask = {
    title: "",
    type: TypeEnum.Grouping,
    difficulty: 50,
    classFrom: 4,
    classTo: 6,
    subject: SubjectEnum.None
  };

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
              private router: Router,
              public dialogRef: MatDialogRef<NewTaskComponent>) {

  }

  getTaskParams() {
    return {
      title: this.newTaskModel.title,
      difficulty: this.newTaskModel.difficulty,
      recommendedMinClass: this.newTaskModel.classFrom,
      recommendedMaxClass: this.newTaskModel.classTo
    }
  }

  saveData() {
    this.submitted = true;
    this.navigateToTaskTypeComponent(TypeEnumUtil.stringToTaskType(this.newTaskModel.type))
    this.dialogRef.close()
  }

  taskIsValid(): boolean {
    return true;
  }

  private navigateToTaskTypeComponent(taskType: TypeEnum) {
    this.router.navigate([ConvertEnum.convertTypeToRouterLink(taskType), this.getTaskParams()])
  }
}

export interface NewTask {
  title: string;
  type: TypeEnum;
  difficulty: number;
  classFrom: number;
  classTo: number;
  subject: SubjectEnum;
}
