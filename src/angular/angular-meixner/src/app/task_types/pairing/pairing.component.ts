import {AfterViewChecked, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {
  EasyTasksService,
  MediaItemRequest,
  MediaItemResponse,
  PairElementRequest,
  PairingRequest,
  PairingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute} from "@angular/router";
import {TaskAngularService} from "../../data/task-angular.service";
import {take} from "rxjs/operators";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit, AfterViewChecked {

  public pairingRequest: PairingRequest;
  public taskId: number = null
  public selectedMediaItem: MediaItemResponse;
  @ViewChildren('pairchild') pairs: ElementRef[];
  pairElements: any;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              public taskAngularService: TaskAngularService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewPairingRequest()
    } else {
      this.initPairingRequestById()
    }
    console.log(`TaskId: ${this.taskId}`)
    console.log(this.pairingRequest)
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
  }

  initPairingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let pairingResponse = taskResponse as PairingResponse
        this.pairingRequest = new class implements PairingRequest {
          title = pairingResponse.title
          difficulty = pairingResponse.difficulty
          recommendedMinClass = pairingResponse.recommendedMinClass
          recommendedMaxClass = pairingResponse.recommendedMaxClass
          pairs = pairingResponse.pairs
          subject = pairingResponse.subject
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewChecked(): void {
    this.pairElements = this.pairs.map(pair => {
      return pair.nativeElement;
    });
  }

  public updatePairElement(newValue, indexService, indexPair) {
    this.pairingRequest.pairs[indexService].pair[indexPair].content = newValue;
  }

  public deletePair(indexService) {

  }

  public addPairElement(indexService) {
    const newRow: MediaItemRequest = {content: ''};
    this.pairingRequest.pairs[indexService].pair.push(newRow);
    this.easyTasksService.createPairingUsingPOST(this.pairingRequest)
      .subscribe(data => {
        this.taskAngularService.finishedLoading.pipe(take(1)).subscribe(() => {
            this.pairElements = this.pairs.map(pair => {
              return pair.nativeElement;
            });
            this.selectPair(indexService, this.pairingRequest.pairs[indexService].pair.length);
          }
        );
      });
  }

  public newPair() {

  }

  public selectPair(indexPair, mediaId) {
    this.pairElements[mediaId].focus();
  }

  public elementClicked(indexPair, mediaId) {
  }

  public deletePairElement(indexService, indexPair) {
    this.pairingRequest.pairs[indexService].pair.splice(indexPair, 1);
  }
}
