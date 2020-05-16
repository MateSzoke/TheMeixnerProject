import { Injectable } from '@angular/core';
import {TaskResponse} from "../../swagger-api";

@Injectable({
  providedIn: 'root'
})
export class TaskAngularService {

  public exercises: Array<any> = new Array<any>();

  constructor() { }

}
