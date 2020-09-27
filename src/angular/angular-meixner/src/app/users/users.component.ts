import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService, UserRequest, UserResponse} from "../../swagger-api";
import {ConvertEnum} from "../model/ConvertEnum";
import RoleEnum = UserRequest.RoleEnum;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public roles: Array<string> = ['Admin', 'Diák'];
  users: Array<UserResponse>;
  public wrongUser = false;
  username: string = null;
  password: string = null;
  errorMessage = 'Invalid Credentials';
  private role: number = -1;

  ngOnInit() {
    this.roles = new Array<string>();
    for (let i in UserRequest.RoleEnum) {
      this.roles.push(ConvertEnum.convertRole(i));
    }
    //mock data, TODO get it from server
    this.users = [
      {"id": 1, "role": RoleEnum.STUDENT, "username": "test student"},
      {"id": 2, "role": RoleEnum.STUDENT, "username": "Kiss Béla"},
      {"id": 3, "role": RoleEnum.STUDENT, "username": "Kovács Ilona"},
      {"id": 4, "role": RoleEnum.STUDENT, "username": "Árpád Gizella"}]
  }

  constructor(private router: Router,
              public accountService: AccountService,
              private http: HttpClient) {
  }

  register() {
    if (this.username == null || this.password == null || this.role == -1) {
      alert("Kérem adja meg az összes adatot!");
      return;
    } else {

      let j = 0;
      let roleEnum: string;
      for (let i in UserRequest.RoleEnum) {
        if (j == this.role) {
          roleEnum = i;
        }
        j++;
      }
      this.accountService.registerUsingPOST({
        username: this.username,
        password: this.password, role: roleEnum
      } as UserRequest).subscribe(
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

  openMyExercises(userId: number) {
    // TODO open exercises dialog and bind for the given user
  }

  openUserResults(userId: number) {
    // TODO open results of the given user
  }

  deleteUser(userId: number) {
    // TODO delete user
  }
}
