import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService, UserRequest, UserResponse} from "../../swagger-api";
import {ConvertEnum} from "../model/ConvertEnum";
import {MatDialog} from "@angular/material/dialog";
import {ExerciseListComponent} from "./excercise-list/exercise-list.component";
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
  private role: number = -1;

  constructor(private router: Router,
              public accountService: AccountService,
              private dialog: MatDialog,
              private http: HttpClient) {
  }

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
      {"id": 123, "role": RoleEnum.ADMIN, "username": "Dr. Kiss Gábor József"},
      {"id": 4, "role": RoleEnum.STUDENT, "username": "Árpád Gizella"}]
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

  openMyExercises(user: UserResponse) {
    this.dialog.open(ExerciseListComponent, {
      data: {user: user}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload()
    })
  }

  openUserResults(userId: number) {
    this.router.navigate([`felhasznalok/${userId}`])
  }

  deleteUser(userId: number) {
    // TODO delete user
  }

  isStudent(user: UserResponse): boolean {
    return user.role == RoleEnum.STUDENT
  }
}
