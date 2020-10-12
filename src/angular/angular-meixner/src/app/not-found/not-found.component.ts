import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../swagger-api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  isLoading: boolean = true
  loggedIn: boolean = false

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.accountService.getCurrentUserUsingGET().subscribe(() => {
        this.loggedIn = true
        this.isLoading = false
      },
      () => {
        this.loggedIn = false
        this.isLoading = false
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }
}
