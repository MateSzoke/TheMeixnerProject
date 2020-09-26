import {Component, OnInit} from '@angular/core';
import {ExerciseRequest, ExercisesService} from '../../swagger-api';
import {ModalComponent} from '../modal/modal.component';
import {Observable} from "rxjs";

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
        this.createExercise(this.name, this.comment).subscribe(
          data => {

          },
          error => {
          },
          () => {
          }
        );
        ModalComponent.closeAfterSave();
        window.location.reload()
      }
    });
  }

  ngOnInit() {
  }

  private createExercise(name: string, comment: string): Observable<any> {
    const exercise: ExerciseRequest = {name: name, comment: comment};
    return this.exerciseService.createExercisesUsingPOST(exercise);
  }

  public setName(event) {
    this.name = event;
  }

  setComment(event) {
    this.comment = event;
  }

}
