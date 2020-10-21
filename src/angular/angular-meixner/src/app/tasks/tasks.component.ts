import {Component, OnInit} from '@angular/core';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {ConvertEnum} from '../model/ConvertEnum';
import {NewTaskComponent} from "../new-task/new-task.component";
import {DateUtils} from "../util/date";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskAngularService} from "../data/task-angular.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public subjects: Array<String> = ['történelem', "matematika"];
  public classYears = Array.from({length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public classes: Array<String> = ['a', 'b', 'c'];
  public tasks: Array<TaskResponse> = new Array<TaskResponse>();
  public tasksLoaded = false;
  public getAllTasks = false;
  public routerLink = "parositas";

  matDialogRef: MatDialogRef<NewTaskComponent>;

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private taskService: TaskService,
              public router: Router,
              private route: ActivatedRoute,
              public diffImServ: DiffimageService,
              public taskAngularService: TaskAngularService,
              private matDialog: MatDialog) {
    modComponent.ngOnInit();
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (JSON.stringify(params.viewtype) === JSON.stringify(String('feladatok'))) {
        this.getAllTasks = true;
        this.taskAngularService.getAllTasksFunction();
        ModalComponent.closeBtnPressed.subscribe(
          data => {
            this.taskAngularService.getAllTasksFunction();
          },
          error => {

          },
          () => {
          });

      } else {
        this.getAllTasks = false;
        this.getMyTasksFunction();
        ModalComponent.closeBtnPressed.subscribe(
          data => {
            this.getMyTasksFunction();
          },
          error => {

          },
          () => {
          });
      }
    });

  }

  public deleteTask(input: number) {
    this.taskAngularService.tasksLoaded = false;
    this.taskService.deleteTaskByIdUsingDELETE(input).subscribe(
      data => {
        if (this.getAllTasks === true) {
          this.taskAngularService.getAllTasksFunction();
        } else {
          this.getMyTasksFunction();
        }
      },
      err => {

      },
      () => {

      }
    )
  }


  public removeModalnewTask() {
    if (this.getAllTasks === true) {
      this.taskAngularService.getAllTasksFunction();
    } else {
      this.getMyTasksFunction();
    }
    this.modal.destroy();
  }

  public redirect(input: string): string {
    let router: string = ConvertEnum.convertTypeToRouterLink(input);
    return router;
  }

  public openTask(task: TaskResponse) {
    this.router.navigate([ConvertEnum.convertTypeToRouterLink(task.type), {taskId: task.id}]);
  }

  public async newTask() {
    this.matDialogRef = this.matDialog.open(NewTaskComponent, {
      data: {name: "Uj feladat"},
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {

      }
    });
  }

  public convertEnum(input: string): string {
    return ConvertEnum.convertType(input);
  }

  getFormattedDate(date: Date): string {
    return DateUtils.getFormattedDate(date);
  }

  public subjectChange(input) {

  }

  public classYearsChange(input) {

  }

  private getMyTasksFunction() {
    this.taskService.getMyTaskUsingGET().subscribe(data => {
        this.taskAngularService.tasks = new Array<TaskResponse>();

        data.forEach(element => {
          this.taskAngularService.tasks.push(element);
        });
        this.taskAngularService.tasksLoaded = true;
      },
      error => {

      },
      () => {
      });
  }

}
