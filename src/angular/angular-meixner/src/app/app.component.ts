import { Component } from '@angular/core';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-meixner';
  public logInStatus = false;

  constructor(
    public authenticationService: AuthenticationService
  ) {
      this.authenticationService.userLoggedIn.subscribe(
        data => {
          this.logInStatus = data;
        },
        err => {

        },
        fin => {

        }
      );
      this.authenticationService.emitCurrentData();
  }

  onLogout() {
    this.authenticationService.logout();
  }


}

