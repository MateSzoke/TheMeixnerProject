import {Component, OnInit} from '@angular/core';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {NewExerciseComponent} from '../new-exercise/new-exercise.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {ConvertEnum} from '../model/ConvertEnum';

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
  public exercisesUI: Array<TaskResponse> = new Array<TaskResponse>();
  public exercisesLoaded = false;
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
    this.exercisesLoaded = false;
    console.log("calling delete");
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
        this.exercises = new Array<TaskResponse>();
        this.exercisesUI = new Array<TaskResponse>();
        data.forEach(element => {
          this.exercises.push({
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
          this.exercisesUI.push({
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
        this.exercises = new Array<TaskResponse>();

        this.exercisesUI = new Array<TaskResponse>();
        data.forEach(element => {
          this.exercises.push({
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
          this.exercisesUI.push({
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
        this.exercisesLoaded = true;
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
  }

  public newTask() {
    this.dom.show(NewExerciseComponent);
  }

  public convertEnum(input: string) {
    ConvertEnum.convertType(input);
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
