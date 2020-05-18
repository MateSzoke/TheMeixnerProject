import {Component, OnInit} from '@angular/core';
import {ExerciseRequest, ExercisesService} from '../../swagger-api';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {

  public name: string = null;
  public comment: string = "";

  constructor(
    private modalComponent: ModalComponent,
    private exerciseService: ExercisesService
  ) {

    ModalComponent.saveBtnPressed.subscribe(data => {
      if (this.name == null) {
        alert("Feladatsor neve nem lehet üres");
        return;
      } else {
        const exercise: ExerciseRequest = {name: this.name, comment: this.comment};
        exerciseService.createExercisesUsingPOST(exercise);
        ModalComponent.closeAfterSave(data);
      }
    });
  }

  ngOnInit() {
  }

  public setName(event) {
    this.name = event;
  }

  setComment(event) {
    this.comment = event;
  }

}
