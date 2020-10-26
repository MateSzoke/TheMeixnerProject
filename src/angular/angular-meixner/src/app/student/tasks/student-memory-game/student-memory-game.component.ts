import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  AssignService,
  EvaluateService,
  MediaItemResponse,
  MemoryGameResponse,
  TaskService
} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
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
  memory: MemoryGameResponse = null
  elements: Array<MemoryUI> = new Array<MemoryUI>()
  memoryRequest: MemoryGameTaskRequest = null
  firstElement: MemoryUI = null
  secondElement: MemoryUI = null
  correctPairs: number = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private dialog: MatDialog,
    private assignService: AssignService,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.taskService.getTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.memory = task as MemoryGameResponse
      this.memoryRequest = {
        pairs: []
      }
      this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
        let memoryTask = task as MemoryGameTask
        memoryTask.elements.forEach(mediaItem => this.elements.push(new MemoryUI(mediaItem)))
        this.loaded = true
      })
    })

  }

  evaluateTask() {
    this.evaluateService.evaluateMemoryGameUsingPOST(this.startedExerciseId, this.taskId, this.memoryRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.memoryRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(MemoryGameResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

  elementClicked(element: MemoryUI, index: number) {
    if (this.secondElement != null || element.clicked) {
      return
    }
    this.elements[index].clicked = true
    if (this.firstElement == null) {
      this.firstElement = this.elements[index]
    } else {
      this.secondElement = this.elements[index]
    }
    if (this.secondElement != null) {
      let correct = false
      this.memory.pairs.forEach(pair => {
        if (pair.pair[0].content == this.firstElement.mediaItem.content && pair.pair[1].content == this.secondElement.mediaItem.content
          || pair.pair[1].content == this.firstElement.mediaItem.content && pair.pair[0].content == this.secondElement.mediaItem.content) {
          this.elements[this.elements.indexOf(this.firstElement)].correct = true
          this.elements[this.elements.indexOf(this.secondElement)].correct = true
          correct = true
          this.memoryRequest.pairs.push(pair)
        }
      })
      if (correct) {
        this.firstElement = null
        this.secondElement = null
      }
    }
  }

  getSuccess(index: number): Boolean {
    if (this.secondElement != null)
      return this.elements[index].correct && this.elements[index].clicked
    else
      return false
  }

  getFail(index: number): Boolean {
    if (this.secondElement != null)
      return !this.elements[index].correct && this.elements[index].clicked
    else
      return false
  }

  reset() {
    this.elements = this.elements.map(element => new MemoryUI(element.mediaItem))
    this.firstElement = null
    this.secondElement = null
    this.memoryRequest.pairs = []
  }
}

class MemoryUI {
  mediaItem: MediaItemResponse
  correct: boolean
  clicked: boolean

  constructor(mediaItem: MediaItemResponse) {
    this.mediaItem = mediaItem
    this.correct = false
    this.clicked = false
  }
}
