import {Component, OnInit} from '@angular/core';
import {DomService} from '../service/dom.service';
import {ModalService} from '../service/modal.service';
import {DateUtils} from '../util/date';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ExercisesResponse, ExercisesService, TaskResponse} from "../../swagger-api";
import {NewExerciseComponent} from "../new-exercise/new-exercise.component";
import {ExerciseTaskListComponent} from "../exercise-task-list/exercise-task-list.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public subjects: Array<String> = ['történelem', "matematika"];
  public classes = Array.from({length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public exercises: Array<ExercisesResponse> = new Array<ExercisesResponse>();
  public exercisesUI: Array<ExerciseUI> = new Array<ExerciseUI>();
  public exercisesLoaded = false;
  public getAllTasks = false;

  constructor(private modal: ModalService, private dom: DomService,
              private modComponent: ModalComponent,
              private exerciseService: ExercisesService,
              private dialog: MatDialog,
              public router: Router,
              private route: ActivatedRoute) {
    modComponent.ngOnInit();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getAllTasks = true;
      this.getMyExercises();
      ModalComponent.closeBtnPressed.subscribe(
        data => {
          this.getMyExercises();
        },
        error => {

        },
        () => {
        });
    });

  }

  mapTaskResponse(tasks: Array<TaskResponse>): Array<TaskResponseUI> {
    return tasks.map(task =>
      new TaskResponseUI(
        task.id,
        task.title,
        DateUtils.getFormattedDate(task.lastModified)
      )
    )
  }

  removeModalNewExercise() {
    this.modal.destroy();
  }

  newExercise() {
    this.dom.show(NewExerciseComponent);
  }

  openMyTasks(exerciseId: number) {
    this.dialog.open(ExerciseTaskListComponent, {
      data: {exerciseId: exerciseId}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload()
    })
  }

  deleteExercise(exerciseId: number) {
    this.exercisesLoaded = true;
    this.exerciseService.deleteExercisesUsingDELETE(exerciseId).subscribe(
      data => {
        this.exercisesLoaded = false;
      },
      () => {
      },
      () => {
        window.location.reload()
      }
    );
  }

  deleteTaskFromExercise(exerciseId: number, taskId: number) {
    this.exercisesLoaded = true;
    this.exerciseService.removeTaskFromExercisesUsingDELETE(exerciseId, taskId).subscribe(
      data => {
        this.exercisesLoaded = false;
      },
      () => {
      },
      () => {
        window.location.reload()
      }
    )
  }

  private getMyExercises() {
    this.exerciseService.getMyExercisesUsingGET1().subscribe(data => {
        this.exercises = new Array<ExercisesResponse>();
        this.exercisesUI = new Array<ExerciseUI>();
        data.forEach(exercise => {
          this.exercises.push({
            id: exercise.id,
            averageDifficulty: exercise.averageDifficulty,
            lastModified: exercise.lastModified,
            owner: exercise.owner,
            comment: exercise.comment,
            name: exercise.name,
            tasks: exercise.tasks,
          } as ExercisesResponse);
          this.exercisesUI.push({
            id: exercise.id,
            averageDifficulty: exercise.averageDifficulty,
            lastModified: DateUtils.getFormattedDate(exercise.lastModified),
            owner: exercise.owner,
            comment: exercise.comment,
            name: exercise.name,
            tasks: this.mapTaskResponse(exercise.tasks),
          } as ExerciseUI);
        });
        this.exercisesLoaded = true;
      },
      error => {

      },
      () => {
      });
  }

}

class ExerciseUI {
  id: number;
  averageDifficulty: number;
  lastModified: string;
  owner: string;
  comment: string;
  name: string;
  tasks: Array<TaskResponseUI>;
}

class TaskResponseUI {
  id: number;
  title: string;
  formattedLastModified: string;

  constructor(id: number, title: string, formattedLastModified: string) {
    this.id = id;
    this.title = title;
    this.formattedLastModified = formattedLastModified
  }
}
