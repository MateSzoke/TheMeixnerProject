import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  EasyTasksService,
  GroupingRequest,
  GroupingResponse,
  GroupRequest,
  GroupResponse,
  MediaItemRequest,
  MediaItemResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";
import {UpdateBlock} from "../../model/updateBlock";

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.scss']
})
export class GroupingComponent implements OnInit {

  public groupingRequest: GroupingRequest;
  public taskId: number = null
  @ViewChildren('groupchild') groups: QueryList<ElementRef>;
  groupElements: any;
  loaded: boolean = false
  newGrouping = true;
  groupingId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewGroupingRequest()
    } else {
      this.newGrouping = false;
      this.initGroupingRequestById()
    }
  }

  initNewGroupingRequest() {
    let params = this.route.snapshot.paramMap;
    this.groupingRequest = new class implements GroupingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      groups = new Array<GroupRequest>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initGroupingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let groupingResponse = taskResponse as GroupingResponse
        this.groupingRequest = {
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
    this.groupingRequest.groups[indexService].elements[newValue.id].content = newValue.content;
  }

  public deleteGroup(indexService) {
    this.groupingRequest.groups.splice(indexService, 1);
  }

  public addGroupRequest(indexElement) {
    const newRow: MediaItemRequest = {content: ''};
    this.groupingRequest.groups[indexElement].elements.push(newRow);
  }

  public addGroup() {
    const newRow: GroupRequest = {
      name: '',
      elements: new Array<MediaItemRequest>()
    };
    this.groupingRequest.groups.push(newRow);
  }

  public deleteGroupElement(indexService, indexGroup) {
    this.groupingRequest.groups[indexService].elements.splice(indexGroup, 1);
  }

  groupingElementResponseToRequest(response: GroupResponse): GroupRequest {
    return {
      name: response.name,
      elements: response.elements.map(mediaItem => this.mediaItemResponseToRequest(mediaItem))
    }
  }

  mediaItemResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    if(response.type === MediaItemResponse.TypeEnum.FILE) {
      return {
        mediaItemId: response.mediaItemId,
        content: response.content
      }
    } else {
      return {
        content: response.content
      }
    }
  }

  saveData() {
    console.log("saveData");
    if(this.newGrouping) {
      console.log("createGroupingUsingPOST");
      this.easyTasksService.createGroupingUsingPOST(this.groupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      console.log("updateGroupingByIdUsingPATCH");
      this.easyTasksService.updateGroupingByIdUsingPATCH(this.groupingId,this.groupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

  onTitleChange(index,$event: string) {
    this.groupingRequest.groups[index].name = $event;
  }

  addImageId(i: number, $event: UpdateBlock) {
    this.groupingRequest.groups[i].elements[$event.id].mediaItemId = $event.mediaId;
  }
}
