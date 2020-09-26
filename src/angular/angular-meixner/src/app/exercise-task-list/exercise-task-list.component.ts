import {Component, Inject, OnInit} from '@angular/core';
import {ExercisesService, TaskResponse, TaskService} from "../../swagger-api";
import {DateUtils} from "../util/date";
import {TypeEnumUtil} from "../util/typeEnumUtil";
import {ModalComponent} from "../modal/modal.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import TypeEnum = TaskResponse.TypeEnum;

@Component({
  selector: 'app-exercise-task-list',
  templateUrl: './exercise-task-list.component.html',
  styleUrls: ['./exercise-task-list.component.scss']
})
export class ExerciseTaskListComponent implements OnInit {
  public exerciseId: number;
  public tasks: Array<TaskUI> = new Array<TaskUI>();
  public tasksLoaded = false;

  constructor(
    private modalComponent: ModalComponent,
    private exerciseService: ExercisesService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.exerciseId = params.exerciseId
  }

  ngOnInit(): void {
    this.taskService.getMyTaskUsingGET().subscribe(tasks => {
        tasks.forEach(task => {
          this.tasks.push(new TaskUI(task.id, task.title, task.type, task.lastModified));
        });
        this.tasksLoaded = true;
      },
      error => {

      },
      () => {
      });
  }

  saveTasks() {
    this.tasks.forEach(task => {
      if (task.checked) {
        this.exerciseService.addTaskToExercisesUsingPOST(this.exerciseId, task.id).subscribe();
      }
    });
  }

}

class TaskUI {
  id: number;
  name: string;
  type: string;
  lastModified: string;
  checked: boolean = false;

  constructor(id: number, name: string, type: TypeEnum, lastModified: Date) {
    this.id = id;
    this.name = name;
    this.type = TypeEnumUtil.taskTypeToString(type);
    this.lastModified = DateUtils.getFormattedDate(lastModified);
  }
}
