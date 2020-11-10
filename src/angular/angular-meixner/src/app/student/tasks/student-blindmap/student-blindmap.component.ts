import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {BlindMapTaskRequest} from "../../../../swagger-api/model/blindMapTaskRequest";
import {BlindMapTask} from "../../../../swagger-api/model/blindMapTask";
import {GroupingResultComponent} from "../result/grouping-result/grouping-result.component";

@Component({
  selector: 'app-student-blindmap',
  templateUrl: './student-blindmap.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentBlindmapComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  blindMap: BlindMapTask = null
  blindMapRequest: BlindMapTaskRequest = null
  currentResult: Array<Boolean> = new Array<Boolean>()
  options: Array<string> = new Array<string>()
  tagResult: Array<Array<string>> = new Array<Array<string>>()
  positions: Array<{ x: number, y: number }> = new Array<{ x: number; y: number }>()
  success: boolean
  fail: boolean


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private assignService: AssignService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.blindMap = task as BlindMapTask
      this.blindMap.tags.forEach(tag => {
        this.positions.push({x: tag.x, y: tag.y})
        this.options.push(tag.text)
        this.tagResult.push([])
      })
      this.blindMapRequest = {
        tags: []
      }
      console.log(this.blindMap)
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<string>, any>, isFromAvailable: boolean) {
    let fromData = event.previousContainer.data
    let toData = event.container.data
    let fromIndex = event.previousIndex
    let toIndex = event.currentIndex
    if (event.container.data.length >= 1 && !isFromAvailable) {
      transferArrayItem(toData, fromData, 0, 0);
      transferArrayItem(fromData, toData, 2, 1);
    } else {
      transferArrayItem(fromData, toData, fromIndex, toIndex);
    }
    this.blindMapRequest.tags = this.tagResult.map(result => ({
      text: result[0],
      x: 0,
      y: 0
    }))
    console.log(this.blindMapRequest)
  }

  getSuccess(index: number): string {
    if (this.currentResult.length != 0 && this.currentResult[index])
      return 'green'
    else if (this.currentResult.length != 0 && !this.currentResult[index])
      return 'red'
    else
      return 'white'
  }

  getSize(size: number): string {
    return `${size + 50}px`
  }

  evaluateTask() {
    this.evaluateService.evaluateBlindMapUsingPOST(this.startedExerciseId, this.taskId, this.blindMapRequest).subscribe(response => {
      console.log(response.taskResult)
      this.loaded = false
      if (response.taskResult.taskResult == undefined) {
        this.currentResult = response.taskResult.currentResult
        this.blindMapRequest.attempts = response.taskResult.attempts
      } else {
        this.dialog.open(GroupingResultComponent, {
          data: {startedExercise: response},
          disableClose: true
        })
      }
      this.loaded = true
    })
  }

}
