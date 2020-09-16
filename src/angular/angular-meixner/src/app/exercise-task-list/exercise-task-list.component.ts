import {Component, Input, OnInit} from '@angular/core';
import {ExercisesService, TaskResponse, TaskService} from "../../swagger-api";
import {TaskAngularService} from "../data/task-angular.service";
import {DateUtils} from "../util/date";
import {TypeEnumUtil} from "../util/typeEnumUtil";
import {ModalComponent} from "../modal/modal.component";
import TypeEnum = TaskResponse.TypeEnum;

@Component({
  selector: 'app-exercise-task-list',
  templateUrl: './exercise-task-list.component.html',
  styleUrls: ['./exercise-task-list.component.scss']
})
export class ExerciseTaskListComponent implements OnInit {
  @Input() public exerciseId: number;
  public tasks: Array<TaskUI> = new Array<TaskUI>();
  public tasksLoaded = false;

  constructor(
    private modalComponent: ModalComponent,
    private exerciseService: ExercisesService,
    private taskService: TaskService,
    private taskAngular: TaskAngularService
  ) {
    ModalComponent.saveBtnPressed.subscribe(data => {
      this.tasks.forEach(task => {
        if (task.checked) {
          exerciseService.addTaskToExercisesUsingPOST(this.exerciseId, task.id)
        }
      });
      ModalComponent.closeAfterSave(data);
    });
  }

  ngOnInit(): void {
    this.taskService.getMyTaskUsingGET().subscribe(tasks => {
        tasks.forEach(task => {
          this.tasks.push(new TaskUI(task.id, task.title, task.type, task.lastModified));
        });
        this.tasksLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
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
