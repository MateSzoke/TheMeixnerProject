import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService, ResultsService, UserRequest, UserResponse} from "../../swagger-api";
import {ConvertEnum} from "../model/ConvertEnum";
import {MatDialog} from "@angular/material/dialog";
import {ExerciseListComponent} from "./excercise-list/exercise-list.component";
import {Path} from "../path";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import RoleEnum = UserRequest.RoleEnum;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  roles: Array<string> = new Array<string>();
  users: Array<UserResponse> = new Array<UserResponse>();
  userForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required, Validators.minLength(3)]],
    password: [null, [Validators.required, Validators.minLength(3)]],
    role: [null, Validators.required]
  });

  constructor(private router: Router,
              public accountService: AccountService,
              public resultsService: ResultsService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    for (let role in RoleEnum) {
      this.roles.push(ConvertEnum.convertRoleToString(role));
    }

    this.loadUsers()
  }

  loadUsers() {
    this.users = []
    this.resultsService.getAllUsersUsingGET().subscribe(users => {
        users.forEach(user => {
          this.users.push(user)
        })
      },
      error => {
        console.log(`Get all users error: ${error}`)
      }
    )
  }

  register() {
    if (!this.userForm.valid) {
      return;
    } else {
      this.accountService.registerUsingPOST({
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: ConvertEnum.convertStringToRoleEnum(this.userForm.value.role)
      } as UserRequest).subscribe(
        data => {
        },
        error => {
        },
        () => {
          this.loadUsers()
        }
      );
    }
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
    this.router.navigate([`${Path.USER_DETAILS}`, {userId: userId}])
  }

  deleteUser(userId: number) {
    // TODO delete user
  }

  isStudent(user: UserResponse): boolean {
    return user.role == RoleEnum.STUDENT
  }
}
