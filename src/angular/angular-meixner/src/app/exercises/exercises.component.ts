import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {NewExerciseComponent} from '../new-exercise/new-exercise.component';
import {Router} from '@angular/router';
import {TaskResponse, TaskService} from '../../swagger-api';
import {DiffimageService} from '../service/diffimage.service';
import {Task} from 'protractor/built/taskScheduler';
import {ConvertEnum} from '../model/ConvertEnum';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public tantargyak:Array<String> = ['történelem', "matematika"];
  public evfolyamok = Array.from({ length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public osztalyok:Array<String> = ['a', 'b', 'c'];
  public feladatok : Array<TaskResponse> = new Array<TaskResponse>();

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private taskService: TaskService,
              public router: Router,
              public diffImServ: DiffimageService) {
    modComponent.ngOnInit();
  }

  ngOnInit(): void {
    this.taskService.getAllTaskUsingGET().subscribe(data => {
      console.log("data received");
        data.forEach(element => {
          this.feladatok.push({difficulty: element.difficulty,
          id: element.id,
          lastModified: element.lastModified,
          owner: element.owner,
          title: element.title,
          type: element.type} as TaskResponse);
          console.log(element);
        });
    },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
    ModalComponent.closeBtnPressed.subscribe(
      data => {
        this.taskService.getAllTaskUsingGET().subscribe(data => {
            console.log("closeBtnPressed data received");
            this.feladatok = new Array<TaskResponse>();
            data.forEach(element => {
              this.feladatok.push({difficulty: element.difficulty,
                id: element.id,
                lastModified: element.lastModified,
                owner: element.owner,
                title: element.title,
                type: element.type} as TaskResponse);
              console.log(element);
            });
          },
          error => {
            console.log("subscribe error");
          },
          () => {
          });
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      })
  }


  public removeModalnewTask() {
    this.taskService.getAllTaskUsingGET().subscribe(data => {
        console.log("getAllTaskUsingGET data received");
        this.feladatok = new Array<TaskResponse>();
        data.forEach(element => {
          this.feladatok.push({difficulty: element.difficulty,
            id: element.id,
            lastModified: element.lastModified,
            owner: element.owner,
            title: element.title,
            type: element.type} as TaskResponse);
          console.log(element);
        });
      },
      error => {
        console.log("subscribe error");
      },
      () => {
      });
    this.modal.destroy();
  }

  public newTask() {
    this.dom.show(NewExerciseComponent);
  }

  public convertEnum(input: string) {
    ConvertEnum.convert(input);
  }

  public convertToLink(input: string) {
    ConvertEnum.convertToRouterLink(input);
  }
}
