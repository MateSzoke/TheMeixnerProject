import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../swagger-api";
import {TaskAngularService} from "../data/task-angular.service";
import {DateUtils} from "../util/date";

@Component({
  selector: 'app-exercise-task-list',
  templateUrl: './exercise-task-list.component.html',
  styleUrls: ['./exercise-task-list.component.scss']
})
export class ExerciseTaskListComponent implements OnInit {

  public tasks: Array<TaskUI> = new Array<TaskUI>();
  public tasksLoaded = false;

  constructor(
    private taskService: TaskService,
    public taskAngular: TaskAngularService
  ) {
  }

  ngOnInit(): void {
    this.taskService.getMyTaskUsingGET().subscribe(tasks => {
        tasks.forEach(task => {
          this.tasks.push(new TaskUI(task.title, task.type.toString(), task.lastModified));
        });
        console.log(this.taskAngular.tasks);
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
  name: string;
  type: string;
  lastModified: string;

  constructor(name: string, type: string, lastModified: Date) {
    this.name = name;
    this.type = type;
    this.lastModified = DateUtils.getFormattedDate(lastModified);
  }
}
