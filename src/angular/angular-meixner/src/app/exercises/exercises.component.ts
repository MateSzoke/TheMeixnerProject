import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {ModalService} from '../service/modal.service';
import {DomService} from '../service/dom.service';
import {ModalComponent} from '../modal/modal.component';
import {NewExerciseComponent} from '../new-exercise/new-exercise.component';
import {Router} from '@angular/router';

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

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              public router: Router) {
    modComponent.ngOnInit();
  }

  ngOnInit(): void {
  }


  public removeModalnewTask() {
    this.modal.destroy();
  }

  public newTask() {
    this.dom.show(NewExerciseComponent);
  }

}
