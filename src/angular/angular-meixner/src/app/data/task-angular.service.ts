import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskAngularService {

  public tasks: Array<any> = new Array<any>();

  constructor() { }

}
