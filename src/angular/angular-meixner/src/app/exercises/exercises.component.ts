import {Component, OnInit} from '@angular/core';
import {DomService} from '../service/dom.service';
import {ModalService} from '../service/modal.service';
import {DateUtils} from '../util/date';
import {ModalComponent} from '../modal/modal.component';
import {ActivatedRoute, Router} from "@angular/router";
import {ExercisesResponse, ExercisesService, TaskResponse} from "../../swagger-api";
import {NewExerciseComponent} from "./new-exercise/new-exercise.component";
import {ExerciseTaskListComponent} from "../exercise-task-list/exercise-task-list.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectEnumUtil} from "../util/subjectEnumUtil";
import SubjectEnum = TaskResponse.SubjectEnum;

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public subjects: Array<String> = new Array<String>()
  public classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
    for (let subject in SubjectEnum) {
      this.subjects.push(SubjectEnumUtil.subjectToString(subject));
    }
    this.route.params.subscribe(() => {
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
        DateUtils.getFormattedDate(task.lastModified),
        task.difficulty
      )
    )
  }

  removeModalNewExercise() {
    this.modal.destroy();
  }

  newExercise() {
    this.dialog.open(NewExerciseComponent)
    this.dialog.afterAllClosed.subscribe(() => {
      this.getMyExercises()
    })
  }

  openMyTasks(exerciseId: number) {
    this.dialog.open(ExerciseTaskListComponent, {
      data: {exerciseId: exerciseId}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.getMyExercises()
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
        this.getMyExercises()
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
        this.getMyExercises()
      }
    )
  }

  private getMyExercises() {
    this.exerciseService.getMyExercisesUsingGET().subscribe(data => {
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
          classLevel: exercise.classLevel,
          subject: SubjectEnumUtil.subjectToString(exercise.subject),
          owner: exercise.owner,
          comment: exercise.comment,
          name: exercise.name,
          difficulty: exercise.averageDifficulty,
          tasks: this.mapTaskResponse(exercise.tasks),
        } as ExerciseUI);
      });
      this.exercisesLoaded = true;
    })
  }

}

class ExerciseUI {
  id: number;
  averageDifficulty: number;
  lastModified: string;
  owner: string;
  comment: string;
  classLevel: number;
  subject: string;
  name: string;
  tasks: Array<TaskResponseUI>;
  difficulty: number
}

class TaskResponseUI {
  id: number;
  title: string;
  formattedLastModified: string;
  difficulty: number

  constructor(id: number, title: string, formattedLastModified: string, difficulty: number) {
    this.id = id;
    this.title = title;
    this.formattedLastModified = formattedLastModified
    this.difficulty = difficulty
  }
}
