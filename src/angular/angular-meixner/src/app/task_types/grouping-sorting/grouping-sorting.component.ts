import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  ComplexTasksService,
  EasyTasksService, GroupingAndSortingRequest, GroupingAndSortingResponse,
  GroupingRequest,
  GroupingResponse,
  GroupRequest, GroupResponse,
  MediaItemRequest, MediaItemResponse, SortingAndGroupingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-grouping-sorting',
  templateUrl: './grouping-sorting.component.html',
  styleUrls: ['./grouping-sorting.component.scss']
})
export class GroupingSortingComponent implements OnInit {

  public groupingAndSortingRequest: GroupingAndSortingRequest;
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
      this.initNewGroupingSortingRequest()
    } else {
      this.newGrouping = false;
      this.initGroupingSortingRequestById()
    }
  }

  initNewGroupingSortingRequest() {
    let params = this.route.snapshot.paramMap;
    this.groupingAndSortingRequest = new class implements GroupingAndSortingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      groups = new Array<GroupRequest>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initGroupingSortingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let groupingResponse = taskResponse as GroupingAndSortingResponse
        this.groupingAndSortingRequest = {
          title: groupingResponse.title,
          difficulty: groupingResponse.difficulty,
          recommendedMinClass: groupingResponse.recommendedMinClass,
          recommendedMaxClass: groupingResponse.recommendedMaxClass,
          groups: groupingResponse.groups.map(group => this.groupingElementResponseToRequest(group)),
          subject: groupingResponse.subject
        }
        this.loaded = true
        this.groupingId = groupingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewChecked() {

  }

  public updateGroupRequest(indexService, newValue: UpdateBlock ) {
    this.groupingAndSortingRequest.groups[indexService].elements[newValue.id].content = newValue.content;
  }

  public deleteGroup(indexService) {
    this.groupingAndSortingRequest.groups.splice(indexService, 1);
  }

  public addGroupRequest(indexElement) {
    const newRow: MediaItemRequest = {content: ''};
    this.groupingAndSortingRequest.groups[indexElement].elements.push(newRow);
  }

  public addGroup() {
    const newRow: GroupRequest = {
      name: '',
      elements: new Array<MediaItemRequest>()
    };
    this.groupingAndSortingRequest.groups.push(newRow);
  }

  public deleteGroupElement(indexService, indexGroup) {
    this.groupingAndSortingRequest.groups[indexService].elements.splice(indexGroup, 1);
  }

  groupingElementResponseToRequest(response: GroupResponse): GroupRequest {
    return {
      name: response.name,
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
      this.complexTasksService.createGroupingAndSortingUsingPOST(this.groupingAndSortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.complexTasksService.updateGroupingAndSortingByIdUsingPATCH(this.groupingId,this.groupingAndSortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

  onTitleChange(index,$event: string) {
    this.groupingAndSortingRequest.groups[index].name = $event;
  }
}
