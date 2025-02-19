import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  loading = false

  constructor(private router: Router,
              public authenticationService: AuthenticationService,
              private http: HttpClient) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.loading = true
    this.authenticationService.login(this.username, this.password).subscribe(
      () => {
      },
      () => this.loading = false
    );
  }
}
