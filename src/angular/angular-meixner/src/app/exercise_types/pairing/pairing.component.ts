import { Component, OnInit } from '@angular/core';
import {PairingServiceService} from '../../backend_temp/pairing-service.service';
import {PairElement, PairingRequest, TaskResponse, TheEasyTasksService} from "../../../swagger-api";

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {

  public members: PairingRequest;

  constructor(public pairingService: PairingServiceService,
              public theEasyTasksService: TheEasyTasksService) {

  }

  ngOnInit(): void {
    
  }

  public onModelChange(newValue, indexService, indexPair) {
    this.members[indexService].content1 = newValue;

  }

  public deleteItem(indexService) {

  }

  public addPairElement(indexService) {

  }

  public newPairing() {

  }


}
