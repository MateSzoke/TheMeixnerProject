import {EventEmitter, Injectable} from '@angular/core';
import {TaskResponse, TaskService} from "../../swagger-api";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskAngularService {

  private _tasks: Array<any> = new Array<any>();
  private _tasksLoaded = false;
  public finishedLoading: Subject<boolean> = new Subject<boolean>();

  constructor(private taskService: TaskService) { }

  public get tasks(): Array<any> {
    return this._tasks;
  }

  public set tasks(tasks: Array<any>) {
    this._tasks = tasks;
  }

  public get tasksLoaded(): boolean {
    return this._tasksLoaded;
  }

  public set tasksLoaded(value: boolean) {
    this._tasksLoaded = value;
  }

  public getAllTasksFunction() {
    this.taskService.getAllTaskUsingGET().subscribe(data => {
        this.tasks = new Array<TaskResponse>();
        data.forEach(element => {
          this.tasks.push(element);
        });
        this.tasksLoaded = true;
        this.finishedLoading.next(true);
      },
      error => {

      },
      () => {
      });
  }

}
