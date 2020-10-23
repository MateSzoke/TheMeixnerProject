import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  EasyTasksService, MediaItemRequest,
  MediaItemResponse,
  SortingRequest,
  SortingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";
import {UpdateBlock} from "../../model/updateBlock";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  public sortingRequest: SortingRequest;
  public taskId: number = null
  @ViewChildren('elementChild') elementsChild: QueryList<ElementRef>;
  loaded: boolean = false
  newSorting = true;
  sortingId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSortingRequest()
    } else {
      this.newSorting = false;
      this.initSortingRequestById()
    }
  }

  initNewSortingRequest() {
    let params = this.route.snapshot.paramMap;
    this.sortingRequest = new class implements SortingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      elements = new Array<MediaItemRequest>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initSortingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let sortingResponse = taskResponse as SortingResponse
        this.sortingRequest = {
          title: sortingResponse.title,
          difficulty: sortingResponse.difficulty,
          recommendedMinClass: sortingResponse.recommendedMinClass,
          recommendedMaxClass: sortingResponse.recommendedMaxClass,
          elements: sortingResponse.elements.map(group => this.sortingElementResponseToRequest(group)),
          subject: sortingResponse.subject
        }
        this.loaded = true
        this.sortingId = sortingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateElement(newValue: UpdateBlock) {
    this.sortingRequest.elements[newValue.id].content = newValue.content;
  }

  public deleteElement(id) {
    this.sortingRequest.elements.splice(id, 1);
  }

  public addElement() {
    const newRow: MediaItemRequest = {content: ''};
    this.sortingRequest.elements.push(newRow);
  }

  public newElement() {
    const newRow: MediaItemRequest = {
      mediaItemId: 0,
      content: ''
    };
    this.sortingRequest.elements.push(newRow);
  }

  sortingElementResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    return {
      content: response.content
    }
  }

  saveData() {
    console.log("saveData");
    console.log(this.sortingRequest);
    console.log(this.newSorting);
    if(this.newSorting) {
      this.easyTasksService.createSortingUsingPOST(this.sortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    } else {
      this.easyTasksService.updateSortingByIdUsingPATCH(this.sortingId,this.sortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
