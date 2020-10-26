import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  ComplexTasksService,
  EasyTasksService,
  GroupingRequest,
  GroupingResponse, GroupListItemRequest, GroupListItemResponse,
  GroupRequest, GroupResponse,
  MediaItemRequest, MediaItemResponse, SortingAndGroupingRequest, SortingAndGroupingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-sorting-grouping',
  templateUrl: './sorting-grouping.component.html',
  styleUrls: ['./sorting-grouping.component.scss']
})
export class SortingGroupingComponent implements OnInit {

  public sortingAndGroupingRequest: SortingAndGroupingRequest;
  public taskId: number = null
  @ViewChildren('groupchild') groups: QueryList<ElementRef>;
  groupElements: any;
  loaded: boolean = false
  newGrouping = true;
  groupingId = 0;

  constructor(public complexTasksService: ComplexTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSortingGroupingRequest()
    } else {
      this.newGrouping = false;
      this.initSortingGroupingRequestById()
    }
  }

  initNewSortingGroupingRequest() {
    let params = this.route.snapshot.paramMap;
    this.sortingAndGroupingRequest = new class implements SortingAndGroupingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      groups = new Array<GroupListItemRequest>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initSortingGroupingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let sortingGroupingResponse = taskResponse as SortingAndGroupingResponse
        this.sortingAndGroupingRequest = {
          title: sortingGroupingResponse.title,
          difficulty: sortingGroupingResponse.difficulty,
          recommendedMinClass: sortingGroupingResponse.recommendedMinClass,
          recommendedMaxClass: sortingGroupingResponse.recommendedMaxClass,
          groups: sortingGroupingResponse.groups.map(group => this.groupingElementResponseToRequest(group)),
          subject: sortingGroupingResponse.subject
        }
        this.loaded = true
        this.groupingId = sortingGroupingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewChecked() {

  }

  public updateGroupRequest(indexService, newValue: UpdateBlock ) {
    this.sortingAndGroupingRequest.groups[indexService].elements[newValue.id].content = newValue.content;
  }

  public deleteGroup(indexService) {
    this.sortingAndGroupingRequest.groups.splice(indexService, 1);
  }

  public addGroupRequest(indexElement) {
    const newRow: MediaItemRequest = {content: ''};
    this.sortingAndGroupingRequest.groups[indexElement].elements.push(newRow);
  }

  public addGroup() {
    const newRow: GroupRequest = {
      name: '',
      elements: new Array<MediaItemRequest>()
    };
    this.sortingAndGroupingRequest.groups.push(newRow);
  }

  public deleteGroupElement(indexService, indexGroup) {
    this.sortingAndGroupingRequest.groups[indexService].elements.splice(indexGroup, 1);
  }

  groupingElementResponseToRequest(response: GroupListItemResponse): GroupListItemRequest {
    return {
      elements: response.elements.map(mediaItem => this.mediaItemResponseToRequest(mediaItem))
    }
  }

  mediaItemResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    return {
      content: response.content
    }
  }

  saveData() {
    if(this.newGrouping) {
      this.complexTasksService.createSortingAndGroupingUsingPOST(this.sortingAndGroupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.complexTasksService.updateSortingAndGroupingByIdUsingPATCH(this.groupingId,this.sortingAndGroupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

}
