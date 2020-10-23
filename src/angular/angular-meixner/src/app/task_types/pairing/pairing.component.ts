import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  EasyTasksService,
  MediaItemRequest,
  MediaItemResponse,
  PairElementRequest,
  PairElementResponse,
  PairingRequest,
  PairingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskAngularService} from "../../data/task-angular.service";
import {take} from "rxjs/operators";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";
import {UpdateBlock} from "../../model/updateBlock";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit, AfterViewChecked {

  public pairingRequest: PairingRequest;
  public taskId: number = null
  public selectedMediaItem: MediaItemResponse;
  pairElements: any;
  loaded: boolean = false
  newPairing = true;
  pairingId = 0;
  indexOfPrevFocus = -1;
  indexOfCurrentFocus = -2;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewPairingRequest()
    } else {
      this.newPairing = false;
      this.initPairingRequestById()
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

  public updatePairElement(indexService, event: UpdateBlock) {
    this.pairingRequest.pairs[indexService].pair[event.id].content = event.content;
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

  public addPair() {
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
