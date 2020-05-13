import {Component, OnInit} from '@angular/core';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {NewExerciseComponent} from '../new-exercise/new-exercise.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {ConvertEnum} from '../model/ConvertEnum';
import {TaskAngularService} from "../data/task-angular.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public subjects: Array<String> = ['történelem', "matematika"];
  public classYears = Array.from({length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public classes: Array<String> = ['a', 'b', 'c'];
  public exercises: Array<TaskResponse> = new Array<TaskResponse>();
  //public exercisesUI: Array<TaskResponse> = new Array<TaskResponse>();
  public exercisesLoaded = false;
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
    this.exercisesLoaded = false;
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
        this.taskAngular.exercises = new Array<TaskResponse>();
        data.forEach(element => {
          this.taskAngular.exercises.push(element);
        });
        this.exercisesLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  private getMyTasksFunction() {
    this.taskService.getMyTaskUsingGET().subscribe(data => {
        this.taskAngular.exercises = new Array<TaskResponse>();

        data.forEach(element => {
          this.taskAngular.exercises.push(element);
        });
        this.exercisesLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  public newTask() {
    //this.modComponent.ngOnInit();
    this.dom.show(NewExerciseComponent);
  }

  public convertEnum(input: string): string {
    return ConvertEnum.convertType(input);
  }


  public redirect(input: string): string {
    let router: string = ConvertEnum.convertTypeToRouterLink(input);
    return router;
  }

  public openExercise(input: string, id: number) {
    this.router.navigate([ConvertEnum.convertTypeToRouterLink(input) + '/' + id]);
  }

  public subjectChange(input) {
    console.log(input.value);
  }

  public classYearsChange(input) {
    console.log(input.value);
  }

}
