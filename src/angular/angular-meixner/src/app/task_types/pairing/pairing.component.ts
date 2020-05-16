import {Component, OnInit} from '@angular/core';
import {PairingServiceService} from '../../backend_temp/pairing-service.service';
import {EasyTasksService, MediaItemResponse, PairingRequest, PairingResponse} from "../../../swagger-api";
import {ActivatedRoute, Params} from "@angular/router";
import {ModalComponent} from "../../modal/modal.component";
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
      this.pairingResponse = this.taskAngularService.exercises[params.id] as PairingResponse;
    });
  }

  public onModelChange(newValue, indexService, indexPair) {
    this.pairingResponse.pairs[indexService].pair[indexPair].content = newValue;
    this.pairingResponse.pairs[indexService].pair[indexPair].type = MediaItemResponse.TypeEnum.TEXT;
  }

  public deleteItem(indexService) {

  }

  public addPairElement(indexService) {

  }

  public newPairing() {

  }


}
