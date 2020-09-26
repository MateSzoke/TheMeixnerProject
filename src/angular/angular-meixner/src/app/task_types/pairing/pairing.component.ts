import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {
  EasyTasksService,
  MediaItemRequest,
  MediaItemResponse, PairElementResponse,
  PairingRequest,
  PairingResponse
} from "../../../swagger-api";
import {ActivatedRoute, Params} from "@angular/router";
import {TaskAngularService} from "../../data/task-angular.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit, AfterViewChecked {

  public pairingResponse: PairingResponse;
  public selectedMediaItem: MediaItemResponse;
  @ViewChildren('pairchild') pairs: ElementRef[];
  pairElements: any;

  constructor(public theEasyTasksService: EasyTasksService,
              public taskAngularService: TaskAngularService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.pairingResponse = this.taskAngularService.tasks[params.id] as PairingResponse;
    });
  }

  ngAfterViewChecked(): void {
    this.pairElements = this.pairs.map(pair => {
      return pair.nativeElement;
    });
  }

  public updatePairElement(newValue, indexService, indexPair) {
    this.pairingResponse.pairs[indexService].pair[indexPair].content = newValue;
    this.pairingResponse.pairs[indexService].pair[indexPair].type = MediaItemResponse.TypeEnum.TEXT;
    this.syncPairingResponse();
  }

  public deletePair(indexService) {

  }

  public addPairElement(indexService) {
    const newRow: MediaItemResponse = {id: 0, content: '', type: MediaItemResponse.TypeEnum.TEXT};
    this.pairingResponse.pairs[indexService].pair.push(newRow);
    this.theEasyTasksService.updatePairingByIdUsingPATCH(this.pairingResponse.id, {
      title: this.pairingResponse.title,
      difficulty: this.pairingResponse.difficulty,
      subject: this.pairingResponse.subject,
      recommendedMinClass: this.pairingResponse.recommendedMinClass,
      recommendedMaxClass: this.pairingResponse.recommendedMaxClass,
      pairs: this.pairingResponse.pairs
    } as PairingRequest)
      .subscribe(data => {
        this.syncPairingResponse();
        this.taskAngularService.finishedLoading.pipe(take(1)).subscribe(() => {
          this.pairElements = this.pairs.map(pair => {
            return pair.nativeElement;
          });
          this.selectPair(indexService, this.pairingResponse.pairs[indexService].pair.length);
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
    this.pairingResponse.pairs[indexService].pair.splice(indexPair, 1);
    this.syncPairingResponse();
  }

  public syncPairingResponse() {
    this.theEasyTasksService.updatePairingByIdUsingPATCH(this.pairingResponse.id, {
      title: this.pairingResponse.title,
      difficulty: this.pairingResponse.difficulty,
      subject: this.pairingResponse.subject,
      recommendedMinClass: this.pairingResponse.recommendedMinClass,
      recommendedMaxClass: this.pairingResponse.recommendedMaxClass,
      pairs: this.pairingResponse.pairs
    } as PairingRequest)
      .subscribe(data => {
        this.taskAngularService.getAllTasksFunction();
      });
  }
}
