import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDTO} from '../model/taskDTO';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private _loggedInStatus = this.loggedIn.asObservable();
  private firstTask: TaskDTO =
    ({id: 0, title: "elso feladat", difficulty: 3, lastModified: (new Date()).toString()} as TaskDTO);
  private _taskList: Array<TaskDTO> =
    [this.firstTask, this.firstTask ];
  constructor() { }

  logoutUsingGET() : Observable<boolean> {
    this.loggedIn.next(false);
    return this._loggedInStatus;
  }

  loginUsingPOST(password: string, username: string) {
    this.loggedIn.next(true);
  }

  get loggedInStatus(): Observable<boolean> {
    return this._loggedInStatus;
  }

  get taskList(): Array<TaskDTO> {
    return this._taskList;
  }

  set taskList(value: Array<TaskDTO>) {
    this._taskList = value;
  }

  addTask(task:TaskDTO) {
    this._taskList.push(task);
  }
}
