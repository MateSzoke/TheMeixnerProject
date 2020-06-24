import {Component, OnInit} from '@angular/core';
import {PairingServiceService} from '../../backend_temp/pairing-service.service';
import {EasyTasksService, MediaItemResponse, PairingRequest, PairingResponse} from "../../../swagger-api";
import {ActivatedRoute, Params} from "@angular/router";
import {TaskAngularService} from "../../data/task-angular.service";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {

  public pairingResponse: PairingResponse;

  constructor(public pairingService: PairingServiceService,
              public theEasyTasksService: EasyTasksService,
              public taskAngularService: TaskAngularService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log("id is " + JSON.stringify(params.id));
      this.pairingResponse = this.taskAngularService.tasks[params.id] as PairingResponse;
    });
  }

  public updatePairElement(newValue, indexService, indexPair) {
    console.log(newValue);
    this.pairingResponse.pairs[indexService].pair[indexPair].content = newValue;
    this.pairingResponse.pairs[indexService].pair[indexPair].type = MediaItemResponse.TypeEnum.TEXT;
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

  public deleteItem(indexService) {

  }

  public addPairElement(indexService) {

  }

  public newPairing() {

  }


}
