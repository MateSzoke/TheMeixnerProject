import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";
import {MemoryGameTask} from "../../../../swagger-api/model/memoryGameTask";
import {MemoryGameTaskRequest} from "../../../../swagger-api/model/memoryGameTaskRequest";
import {MemoryGameResultComponent} from "../result/memory-game-result/memory-game-result.component";

@Component({
  selector: 'app-student-memory-game',
  templateUrl: './student-memory-game.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentMemoryGameComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  memory: MemoryGameTask = null
  memoryRequest: MemoryGameTaskRequest = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private dialog: MatDialog,
    private assignService: AssignService
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.memory = task as MemoryGameTask
      let pairs = []
      for (let i = 0; i < (this.memory.elements.length / 2); i++) {
        pairs.push({pair: []})
      }
      this.memoryRequest = {
        pairs: pairs
      }
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    if (event.container.data.length >= 2) return
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  evaluateTask() {
    this.evaluateService.evaluateMemoryGameUsingPOST(this.startedExerciseId, this.taskId, this.memoryRequest).subscribe(response => {
      console.log(response)
      this.dialog.open(MemoryGameResultComponent, {
        data: {startedExercise: response}
      })
      let subscription = this.dialog.afterAllClosed.subscribe(() => {
        MyExercisesComponent.navigateNextTask(response, this.router, this.dialog)
        subscription.unsubscribe()
      })
    })
  }
}
