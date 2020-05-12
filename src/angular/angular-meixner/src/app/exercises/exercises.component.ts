import {Component, OnInit} from '@angular/core';
import {DomService} from '../service/dom.service';
import {ModalService} from '../service/modal.service';
import {LoginComponent} from '../login/login.component';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ExercisesResponse, ExercisesService, TaskResponse, TaskService} from "../../swagger-api";
import {DiffimageService} from "../service/diffimage.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public tantargyak: Array<String> = ['történelem', "matematika"];
  public evfolyamok = Array.from({length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public classes: Array<String> = ['a', 'b', 'c'];
  public exercises: Array<ExercisesResponse> = new Array<ExercisesResponse>();
  public exercisesUI: Array<ExercisesResponse> = new Array<ExercisesResponse>();
  public exercisesLoaded = false;
  public getAllTasks = false;

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private exerciseService: ExercisesService,
              public router: Router,
              private route: ActivatedRoute,
              public imageService: DiffimageService) {
    modComponent.ngOnInit();
  }

  ngOnInit(): void {
    console.log("Init called");
    this.route.params.subscribe((params: Params) => {
      console.log("route params received");
      console.log(JSON.stringify(params.viewtype));
      this.getAllTasks = true;
      this.getMyExercises();
      ModalComponent.closeBtnPressed.subscribe(
        data => {
          this.getMyExercises();
        },
        error => {
          console.log("subscribe error");
        },
        () => {
        });
    });

  }

  private getMyExercises() {
    this.exerciseService.getMyExercisesUsingGET().subscribe(data => {
        this.exercises = new Array<ExercisesResponse>();
        this.exercisesUI = new Array<ExercisesResponse>();
        data.forEach(element => {
          this.exercises.push({
            id: element.id,
            averageDifficulty: element.averageDifficulty,
            lastModified: element.lastModified,
            owner: element.owner,
            comment: element.comment,
            name: element.name,
            tasks: element.tasks,
          } as ExercisesResponse);
          this.exercisesUI.push({
            id: element.id,
            averageDifficulty: element.averageDifficulty,
            lastModified: element.lastModified,
            owner: element.owner,
            comment: element.comment,
            name: element.name,
            tasks: element.tasks,
          } as ExercisesResponse);
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

