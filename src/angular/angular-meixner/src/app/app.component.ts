import { Component } from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {DefaultService} from './backend_temp/default.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-meixner';
  public logInStatus = false;

  constructor(
    public authenticationService: AuthenticationService,
    private service: DefaultService
  ) {
    this.service.loggedInStatus.subscribe((data: boolean) =>
    {
      this.logInStatus = data;
    });
  }

  onLogout() {
    this.authenticationService.logout();
  }


}

