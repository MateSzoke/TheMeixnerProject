import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SortingTaskRequest} from "../../../../swagger-api/model/sortingTaskRequest";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AssignService, EvaluateService} from "../../../../swagger-api";
import {SortingTask} from "../../../../swagger-api/model/sortingTask";
import {Path} from "../../../path";
import {ConvertEnum} from "../../../model/ConvertEnum";
import {MyExercisesComponent} from "../../my-exercises/my-exercises.component";

@Component({
  selector: 'app-student-sorting',
  templateUrl: './student-sorting.component.html',
  styleUrls: ['./student-sorting.component.scss']
})
export class StudentSortingComponent implements OnInit {
  loaded: boolean = false
  startedExerciseId: number = null
  taskId: number = null
  sorting: SortingTask = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluateService: EvaluateService,
    private assignService: AssignService
  ) {
  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.startedExerciseId = Number.parseInt(this.route.snapshot.paramMap.get("startedExerciseId"))
    this.assignService.getStudentTaskByIdUsingGET(this.taskId).subscribe(task => {
      this.sorting = task as SortingTask
      this.loaded = true
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sorting.elements, event.previousIndex, event.currentIndex);
    console.log(this.sorting.elements)
  }

  evaluateTask() {
    this.evaluateService.evaluateSortingUsingPOST(this.startedExerciseId, this.taskId, this.createTaskRequest()).subscribe(response => {
      console.log(response)
      if (response.nextTask == undefined) {
        this.router.navigate([Path.STUDENT_EXERCISE_RESULT, {startedExerciseId: this.startedExerciseId}])
      } else {
        this.router.navigate([ConvertEnum.convertTypeToStudentRouterLink(response.nextTask.type), MyExercisesComponent.getNavigationData(response)])
      }
    })
  }

  private createTaskRequest(): SortingTaskRequest {
    return {
      elements: this.sorting.elements.map(element => ({content: element.content}))
    }
  }
}
