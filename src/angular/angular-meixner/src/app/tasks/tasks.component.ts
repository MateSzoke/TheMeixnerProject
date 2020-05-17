import {Component, OnInit} from '@angular/core';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {ConvertEnum} from '../model/ConvertEnum';
import {TaskAngularService} from "../data/task-angular.service";
import {NewTaskComponent} from "../new-task/new-task.component";
import {DateUtils} from "../util/date";

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
  //public tasksUI: Array<TaskResponse> = new Array<TaskResponse>();
  public tasksLoaded = false;
  public getAllTasks = false;
  public routerLink = "parositas";

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private taskService: TaskService,
              public router: Router,
              private route: ActivatedRoute,
              public diffImServ: DiffimageService,
              public taskAngular: TaskAngularService) {
    modComponent.ngOnInit();
  }


  ngOnInit(): void {
    console.log("Init called");
    this.route.params.subscribe((params: Params) => {
      console.log("route params received");
      console.log(JSON.stringify(params.viewtype));
      if (JSON.stringify(params.viewtype) === JSON.stringify(String('feladatok'))) {
        this.getAllTasks = true;
        this.getAllTasksFunction();
        ModalComponent.closeBtnPressed.subscribe(
          data => {
            this.getAllTasksFunction();
          },
          error => {
            console.log("subscribe error");
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
            console.log("subscribe error");
          },
          () => {
          });
      }
    });

  }

  public deleteTask(input: number) {
    this.tasksLoaded = false;
    console.log("calling delete id is " + input);
    this.taskService.deleteTaskByIdUsingDELETE(input).subscribe(
      data => {
        console.log("calling delete get...");
        if (this.getAllTasks === true) {
          this.getAllTasksFunction();
        } else {
          this.getMyTasksFunction();
        }
      },
      err => {
        console.log("delete error");
      },
      () => {

      }
    )
  }


  public removeModalnewTask() {
    if (this.getAllTasks === true) {
      this.getAllTasksFunction();
    } else {
      this.getMyTasksFunction();
    }
    this.modal.destroy();
  }

  public redirect(input: string): string {
    let router: string = ConvertEnum.convertTypeToRouterLink(input);
    return router;
  }

  public openTask(input: string, id: number) {
    this.router.navigate([ConvertEnum.convertTypeToRouterLink(input) + '/' + id]);
  }

  public newTask() {
    //this.modComponent.ngOnInit();
    this.dom.show(NewTaskComponent);
  }

  public convertEnum(input: string): string {
    return ConvertEnum.convertType(input);
  }

  getFormattedDate(date: Date): string {
    return DateUtils.getFormattedDate(date);
  }

  private getAllTasksFunction() {
    this.taskService.getAllTaskUsingGET().subscribe(data => {
        this.taskAngular.tasks = new Array<TaskResponse>();
        data.forEach(element => {
          this.taskAngular.tasks.push(element);
        });
        this.tasksLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  public subjectChange(input) {
    console.log(input.value);
  }

  public classYearsChange(input) {
    console.log(input.value);
  }

  private getMyTasksFunction() {
    this.taskService.getMyTaskUsingGET().subscribe(data => {
        this.taskAngular.tasks = new Array<TaskResponse>();

        data.forEach(element => {
          this.taskAngular.tasks.push(element);
        });
        this.tasksLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

}
