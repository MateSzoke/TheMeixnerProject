import {Component, OnInit} from '@angular/core';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {NewTaskComponent} from '../new-task/new-task.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {ConvertEnum} from '../model/ConvertEnum';

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
  public tasksUI: Array<TaskResponse> = new Array<TaskResponse>();
  public tasksLoaded = false;
  public getAllTasks = false;

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private taskService: TaskService,
              public router: Router,
              private route: ActivatedRoute,
              public diffImServ: DiffimageService) {
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

  private getAllTasksFunction() {
    this.taskService.getAllTaskUsingGET().subscribe(data => {
        this.tasks = new Array<TaskResponse>();
        this.tasksUI = new Array<TaskResponse>();
        data.forEach(element => {
          this.tasks.push({
            difficulty: element.difficulty,
            id: element.id,
            lastModified: element.lastModified,
            owner: element.owner,
            title: element.title,
            type: element.type,
            recommendedMinClass: element.recommendedMinClass,
            recommendedMaxClass: element.recommendedMaxClass,
            subject: element.subject
          } as TaskResponse);
          this.tasksUI.push({
            difficulty: element.difficulty,
            id: element.id,
            lastModified: element.lastModified,
            owner: element.owner,
            title: element.title,
            type: element.type,
            recommendedMinClass: element.recommendedMinClass,
            recommendedMaxClass: element.recommendedMaxClass,
            subject: element.subject
          } as TaskResponse);
        });
        this.tasksLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  private getMyTasksFunction() {
    this.taskService.getMyTaskUsingGET().subscribe(data => {
        this.tasks = new Array<TaskResponse>();

        this.tasksUI = new Array<TaskResponse>();
        data.forEach(element => {
          this.tasks.push({
            difficulty: element.difficulty,
            id: element.id,
            lastModified: element.lastModified,
            owner: element.owner,
            title: element.title,
            type: element.type,
            recommendedMinClass: element.recommendedMinClass,
            recommendedMaxClass: element.recommendedMaxClass,
            subject: element.subject
          } as TaskResponse);
          this.tasksUI.push({
            difficulty: element.difficulty,
            id: element.id,
            lastModified: element.lastModified,
            owner: element.owner,
            title: element.title,
            type: element.type,
            recommendedMinClass: element.recommendedMinClass,
            recommendedMaxClass: element.recommendedMaxClass,
            subject: element.subject,
          } as TaskResponse);
        });
        this.tasksLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  public newTask() {
    //this.modComponent.ngOnInit();
    this.dom.show(NewTaskComponent);
  }

  public convertEnum(input: string): string {
    return ConvertEnum.convertType(input);
  }


  public redirect(input: string) {
    this.router.navigate([ConvertEnum.convertTypeToRouterLink(input)]);
  }

  public subjectChange(input) {
    console.log(input.value);
  }

  public classYearsChange(input) {
    console.log(input.value);
  }

}
