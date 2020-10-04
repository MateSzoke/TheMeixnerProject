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

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit, AfterViewChecked {

  public pairingRequest: PairingRequest;
  public taskId: number = null
  public selectedMediaItem: MediaItemResponse;
  @ViewChildren('pairchild') pairs: QueryList<ElementRef>;
  pairElements: any;
  loaded: boolean = false
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
    if (isNaN(this.taskId)) {
      this.initNewPairingRequest()
    } else {
      this.initPairingRequestById()
    }
    console.log(`TaskId: ${this.taskId}`)
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
        console.log(this.pairingRequest)
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
    console.log(this.pairingRequest.pairs);
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
    console.log("addPairElement");
    console.log(jumpToElementIndex);
    console.log(this.indexOfPrevFocus);
    this.pairingRequest.pairs[indexPair].pair.push(newRow);
    this.indexOfCurrentFocus = jumpToElementIndex;
    /*    this.easyTasksService.createPairingUsingPOST(this.pairingRequest)
          .subscribe(data => {
            this.taskAngularService.finishedLoading.pipe(take(1)).subscribe(() => {
                this.pairElements = this.pairs.map(pair => {
                  return pair.nativeElement;
                });
                this.selectPair(indexService, this.pairingRequest.pairs[indexService].pair.length);
              }
            );
          });*/
  }

  public newPair() {
    const newRow: PairElementRequest = {
      pair: new Array<MediaItemRequest>()
    };
    this.pairingRequest.pairs.push(newRow);
  }

  public selectPair(jumpToElementIndex) {
    console.log(jumpToElementIndex);
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
      mediaItemId: response.id,
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
    this.easyTasksService.createPairingUsingPOST(this.pairingRequest)
      .subscribe(data => {
        this.router.navigate([Path.TASKS]);
      });
  }
}
