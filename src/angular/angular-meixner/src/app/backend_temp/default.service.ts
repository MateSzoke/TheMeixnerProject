import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private _loggedInStatus = this.loggedIn.asObservable();

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
}
