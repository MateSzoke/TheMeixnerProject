import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  EasyTasksService,
  GroupingRequest,
  GroupingResponse,
  GroupRequest, GroupResponse,
  MediaItemRequest, MediaItemResponse,
  TaskService, TrueFalseRequest, TrueFalseResponse
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.scss']
})
export class TrueFalseComponent implements OnInit {

  public trueFalseRequest: TrueFalseRequest;
  public taskId: number = null
  trueFalseElements: any;
  loaded: boolean = false
  newTrueFalse = true;
  trueFalseId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private router: Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewTrueFalseRequest()
    } else {
      this.newTrueFalse = false;
      this.initTrueFalseRequestById()
    }
  }

  initNewTrueFalseRequest() {
    let params = this.route.snapshot.paramMap;
    this.trueFalseRequest = new class implements TrueFalseRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      trueItems = new Array<MediaItemRequest>()
      falseItems = new Array<MediaItemRequest>()
    };
    this.loaded = true
  }

  initTrueFalseRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let trueFalseResponse = taskResponse as TrueFalseResponse
        this.trueFalseRequest = {
          title: trueFalseResponse.title,
          difficulty: trueFalseResponse.difficulty,
          subject: trueFalseResponse.subject,
          recommendedMinClass: trueFalseResponse.recommendedMinClass,
          recommendedMaxClass: trueFalseResponse.recommendedMaxClass,
          trueItems: trueFalseResponse.trueItems.map(mediaItem => this.mediaItemResponseToRequest(mediaItem)),
          falseItems: trueFalseResponse.falseItems.map(mediaItem => this.mediaItemResponseToRequest(mediaItem))
        }
        this.loaded = true
        this.trueFalseId = trueFalseResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateTrueFalseRequest(newValue: UpdateBlock, trueFalse: boolean) {
    if (trueFalse) {
      this.trueFalseRequest.trueItems[newValue.id].content = newValue.content;
    } else {
      this.trueFalseRequest.falseItems[newValue.id].content = newValue.content;
    }
  }

  public deleteElement(indexService, trueFalse: boolean) {
    if (trueFalse) {
      this.trueFalseRequest.trueItems.splice(indexService, 1);
    } else {
      this.trueFalseRequest.falseItems.splice(indexService, 1);
    }
  }

  public addItemRequest(indexElement, trueFalse: boolean) {
    const newRow: MediaItemRequest = {content: ''};
    if (trueFalse) {
      this.trueFalseRequest.trueItems.push(newRow);
    } else {
      this.trueFalseRequest.falseItems.push(newRow);
    }
  }

  mediaItemResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    return {
      content: response.content
    }
  }

  saveData() {
    if (this.newTrueFalse) {
      this.easyTasksService.createTrueFalseUsingPOST(this.trueFalseRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    } else {
      this.easyTasksService.updateTrueFalseByIdUsingPATCH(this.trueFalseId, this.trueFalseRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    }
  }

}
