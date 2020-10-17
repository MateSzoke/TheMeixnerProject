import {Component, OnInit} from '@angular/core';
import {GroupingTask} from "../../../../swagger-api/model/groupingTask";
import {ActivatedRoute, Router} from "@angular/router";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";
import {GroupingTaskRequest} from "../../../../swagger-api/model/groupingTaskRequest";
import {MatDialog} from "@angular/material/dialog";
import {GroupingResultComponent} from "../result/grouping-result/grouping-result.component";

@Component({
  selector: 'app-student-grouping',
  templateUrl: './student-grouping.component.html',
  styleUrls: ['../student-tasks.scss']
})
export class StudentGroupingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  grouping: GroupingTask = null
  groupingRequest: GroupingTaskRequest = null

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
      this.grouping = task as GroupingTask
      this.groupingRequest = {
        groups: this.grouping.groups.map(group => ({name: group, elements: []}))
      }
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<Array<any>, any>) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    console.log(this.groupingRequest)
  }

  evaluateTask() {
    this.evaluateService.evaluateGroupingUsingPOST(this.startedExerciseId, this.taskId, this.groupingRequest).subscribe(response => {
      console.log(response)
      this.dialog.open(GroupingResultComponent, {
        data: {startedExercise: response}
      })
      this.dialog.afterAllClosed.subscribe(() => {
        MyExercisesComponent.navigateNextTask(response, this.router)
      })
    })
  }
}
