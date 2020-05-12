import {Component, OnInit} from '@angular/core';
import {DomService} from '../service/dom.service';
import {ModalService} from '../service/modal.service';
import {LoginComponent} from '../login/login.component';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskResponse, TaskService} from "../../swagger-api";
import {DiffimageService} from "../service/diffimage.service";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public tantargyak: Array<String> = ['történelem', "matematika"];
  public evfolyamok = Array.from({length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
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
    });

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

  removeModalNewExam() {

  }

  newExam() {

  }

  deleteExercise(exerciseId: number) {

  }

  redirect(taskId: number) {

  }
}

