import {Component} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {UserRequest} from "../swagger-api";
import {Path} from "./path";
import RoleEnum = UserRequest.RoleEnum;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-meixner';
  logInStatus = false;
  userRole: RoleEnum = null

  allTasksPath = Path.TASKS_ALL
  myTasksPath = Path.TASKS_MY
  exercisesPath = Path.EXERCISES
  usersPath = Path.USERS
  studentExercisesPath = Path.STUDENT_EXERCISES
  studentResultsPath = Path.STUDENT_RESULTS

  constructor(
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.userLoggedIn.subscribe(loggedIn => {
        this.logInStatus = loggedIn;
      }
    );
    this.authenticationService.userRole.subscribe(role => {
      this.userRole = role;
    });
    this.authenticationService.emitCurrentData();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  isAdmin(): boolean {
    if (this.userRole === null) {
      return false;
    }
    return this.userRole === RoleEnum.ADMIN;
  }

}

