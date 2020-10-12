import {Component} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {UserRequest} from "../swagger-api";
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

  constructor(
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.userLoggedIn.subscribe(loggedIn => {
        this.logInStatus = loggedIn;
      }
    );
    this.authenticationService.userRole.subscribe(role => {
      console.log(role)
      this.userRole = role
    })
    this.authenticationService.emitCurrentData();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  isAdmin(): boolean {
    if (this.userRole == null) {
      return false
    }
    return this.userRole == RoleEnum.ADMIN
  }

}

