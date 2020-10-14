import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SortingTaskRequest} from "../../../../swagger-api/model/sortingTaskRequest";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {EvaluateService} from "../../../../swagger-api";

@Component({
  selector: 'app-student-sorting',
  templateUrl: './student-sorting.component.html',
  styleUrls: ['./student-sorting.component.scss']
})
export class StudentSortingComponent implements OnInit {
  loaded: boolean = false
  exerciseId: number = null
  taskId: number = null
  sorting: SortingTaskRequest = null

  constructor(
    private route: ActivatedRoute,
    private evaluateService: EvaluateService
  ) {
  }

  ngOnInit(): void {
    this.sorting = {
      elements: [{content: "1878"}, {content: "1988"}, {content: "2001"}, {content: "1879"}, {content: "1996"}]
    }
    this.loaded = true
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sorting.elements, event.previousIndex, event.currentIndex);
    console.log(this.sorting.elements)
  }

  evaluateTask() {
    this.evaluateService.evaluateSortingUsingPOST(this.taskId, this.createTaskRequest()).subscribe(response => {
      console.log(response)
    })
  }

  private createTaskRequest(): SortingTaskRequest {
    return {
      elements: this.sorting.elements
    }
  }
}
