import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class RouteSelectorService {

  private messageSource = new BehaviorSubject('feladatok');
  selectedRoute = this.messageSource.asObservable();
  private lastRequestedRouteUrl = "";

  constructor() { }

  public setLastRequestedRouteUrl(inputRoute: string) {
    this.lastRequestedRouteUrl = inputRoute;
  }

  public getLastRequestedRouteUrl(): string {
    return this.lastRequestedRouteUrl;
  }

  public setSelectedRoute(inputRoute: string) {
    this.messageSource.next(inputRoute);
  }

  public getSelectedRoute(): Observable<string> {
    return this.selectedRoute;
  }

  public checkIfEquals(compareString: string): boolean {
    return JSON.stringify(this.selectedRoute) === JSON.stringify(compareString);
  }

}
