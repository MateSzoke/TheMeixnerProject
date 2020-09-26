import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService, UserRequest} from "../../swagger-api";
import {ConvertEnum} from "../model/ConvertEnum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public roles: Array<string> = ['Admin', 'Diák'];
  private role : number = -1;
  username: string = null;
  password: string = null;
  errorMessage = 'Invalid Credentials';
  public wrongUser  = false;

  ngOnInit() {
    this.roles = new Array<string>();
    for(let i in UserRequest.RoleEnum) {
      this.roles.push(ConvertEnum.convertRole(i));
    }
  }

  constructor(private router: Router,
              public accountService: AccountService,
              private http: HttpClient) {
  }

  register() {
    if(this.username == null || this.password == null || this.role == -1) {
      alert("Kérem adja meg az összes adatot!");
      return;
    } else {

      let j = 0;
      let roleEnum : string ;
      for(let i in UserRequest.RoleEnum) {
        if(j == this.role) {
          roleEnum = i;
        }
        j++;
      }
      this.accountService.registerUsingPOST({username: this.username,
      password: this.password, role: roleEnum} as UserRequest).subscribe(
            data => {
              alert("Felhasználó hozzáadva!");
            },
            error => {

            },
            () => {

            }
          );
    }


  }

  public roleChange(input) {
    this.role = input.value;
  }
}
