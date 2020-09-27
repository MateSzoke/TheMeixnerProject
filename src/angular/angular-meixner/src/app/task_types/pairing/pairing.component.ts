import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {
  EasyTasksService,
  MediaItemRequest,
  MediaItemResponse, PairElementResponse,
  PairingRequest,
  PairingResponse, TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Params} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit, AfterViewChecked {

  public pairingResponse: PairingResponse = new class implements PairingResponse {
    difficulty: number;
    id: number;
    lastModified: Date;
    owner: string;
    pairs: Array<PairElementResponse>;
    recommendedMaxClass: number;
    recommendedMinClass: number;
    subject: PairingResponse.SubjectEnum;
    title: string;
    type: PairingResponse.TypeEnum;
  }
  public selectedMediaItem: MediaItemResponse;
  @ViewChildren('pairchild') pairs: ElementRef[];
  pairElements: any;

  constructor(public theEasyTasksService: EasyTasksService,
              public taskService: TaskService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskService.getTaskByIdUsingGET(params.id).subscribe(data => {
        console.log("getTaskByIdUsingGET");
        console.log(data);
        this.pairingResponse = data as PairingResponse;
        console.log(this.pairingResponse);
      });
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
    console.log(indexService);
  }

  public newPair() {
    this.theEasyTasksService
      .addElementToPairingByIdUsingPATCH(this.pairingResponse.id).subscribe();
    this.syncPairingResponse();
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
        this.taskService.getTaskByIdUsingGET(this.pairingResponse.id).subscribe(data => {
          this.pairingResponse = data as PairingResponse;
        });
      });
  }
}
