import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  BlindMapRequest,
  EasyTasksService, GroupingRequest, MediaItemRequest,
  MediaItemResponse,
  PairElementRequest, PairElementResponse,
  PairingRequest, PairingResponse, SentenceCompletionRequest, SentenceCreationRequest, SortingRequest, TaskResponse,
  TaskService, TrueFalseRequest
} from "../../../swagger-api";
import {TaskAngularService} from "../../data/task-angular.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";
import TypeEnum = TaskResponse.TypeEnum;

@Component({
  selector: 'app-easy-task',
  templateUrl: './easy-task.component.html',
  styleUrls: ['./easy-task.component.scss']
})
export class EasyTaskComponent implements OnInit {

  public groupingRequest: GroupingRequest;
  public pairingRequest: PairingRequest;
  public sentenceCompletion: SentenceCompletionRequest;
  public sentenceCreationRequest: SentenceCreationRequest;
  public sortingRequest: SortingRequest;
  public trueFalseRequest: TrueFalseRequest;
  public blindMapRequest: BlindMapRequest;

  public taskId: number = null
  public type: string = null
  public selectedMediaItem: MediaItemResponse;
  @ViewChildren('pairchild') pairs: QueryList<ElementRef>;
  pairElements: any;
  loaded: boolean = false
  newPairing = true;
  pairingId = 0;
  indexOfPrevFocus = -1;
  indexOfCurrentFocus = -2;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              public taskAngularService: TaskAngularService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    this.type = this.route.snapshot.paramMap.get("type")
    console.log("ngOnInit")
    console.log(this.type);
    if (isNaN(this.taskId)) {
      this.initNewPairingRequest()
    } else {
      this.newPairing = false;
      this.initEasyTaskById()
    }
  }

  initEasyTaskById() {
    switch (this.type) {
      case TypeEnum.Grouping.toString(): {
        console.log("case Grouping")
        return Path.EASY_TASK;
      }
      case TypeEnum.Pairing.toString(): {
        console.log("case Pairing")
        this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
          (taskResponse) => {
            let pairingResponse = taskResponse as PairingResponse
            this.pairingRequest = {
              title: pairingResponse.title,
              difficulty: pairingResponse.difficulty,
              recommendedMinClass: pairingResponse.recommendedMinClass,
              recommendedMaxClass: pairingResponse.recommendedMaxClass,
              pairs: pairingResponse.pairs.map(pair => this.pairingElementResponseToRequest(pair)),
              subject: pairingResponse.subject
            }
            this.loaded = true
            this.pairingId = pairingResponse.id;
          },
          (error) => {
            console.log(error)
          }
        );
      }
      case TypeEnum.SentenceCompletion.toString(): {
        return Path.EASY_TASK;
      }
      case TypeEnum.SentenceCreation.toString(): {
        return Path.EASY_TASK;
      }
      case TypeEnum.Sorting.toString(): {
        return Path.EASY_TASK;
      }
      case TypeEnum.TrueFalse.toString(): {
        return Path.EASY_TASK;
      }
      case TypeEnum.BlindMap.toString(): {
        return Path.EASY_TASK;
      }

    }
  }

  initNewPairingRequest() {
    let params = this.route.snapshot.paramMap;
    this.pairingRequest = new class implements PairingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      pairs = new Array<PairElementRequest>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    console.log("initNewPairingRequest");
    console.log(this.pairingRequest);
    this.loaded = true
  }

  initPairingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let pairingResponse = taskResponse as PairingResponse
        this.pairingRequest = {
          title: pairingResponse.title,
          difficulty: pairingResponse.difficulty,
          recommendedMinClass: pairingResponse.recommendedMinClass,
          recommendedMaxClass: pairingResponse.recommendedMaxClass,
          pairs: pairingResponse.pairs.map(pair => this.pairingElementResponseToRequest(pair)),
          subject: pairingResponse.subject
        }
        this.loaded = true
        this.pairingId = pairingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewChecked() {

  }

  public updatePairElement(newValue, indexService, indexPair) {
    this.pairingRequest.pairs[indexService].pair[indexPair].content = newValue;
  }

  public deletePair(indexService) {
    this.pairingRequest.pairs.splice(indexService, 1);
  }

  public addPairElement(indexPair) {
    const newRow: MediaItemRequest = {content: ''};
    const lastIndex = this.pairingRequest.pairs[indexPair].pair.length - 1;
    let jumpToElementIndex = 0;
    for (let i = 0; i < indexPair + 1; i++) {
      jumpToElementIndex = jumpToElementIndex + this.pairingRequest.pairs[i].pair.length;
    }
    this.pairingRequest.pairs[indexPair].pair.push(newRow);
    this.indexOfCurrentFocus = jumpToElementIndex;
  }

  public newPair() {
    const newRow: PairElementRequest = {
      pair: new Array<MediaItemRequest>()
    };
    this.pairingRequest.pairs.push(newRow);
  }

  public selectPair(jumpToElementIndex) {
    this.pairElements[jumpToElementIndex].focus();
  }

  public elementClicked(indexPair, mediaId) {

  }

  public deletePairElement(indexService, indexPair) {
    this.pairingRequest.pairs[indexService].pair.splice(indexPair, 1);
  }

  pairingElementResponseToRequest(response: PairElementResponse): PairElementRequest {
    return {
      pair: response.pair.map(mediaItem => this.mediaItemResponseToRequest(mediaItem))
    }
  }

  mediaItemResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    return {
      content: response.content
    }
  }

  initMediaItemRequest(): MediaItemRequest {
    return {
      mediaItemId: 0,
      content: ''
    }
  }

  saveData() {
    console.log("saveData");
    console.log(this.pairingRequest);
    console.log(this.newPairing);
    if(this.newPairing) {
      this.easyTasksService.createPairingUsingPOST(this.pairingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    } else {
      this.easyTasksService.updatePairingByIdUsingPATCH(this.pairingId,this.pairingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    }
  }

}
