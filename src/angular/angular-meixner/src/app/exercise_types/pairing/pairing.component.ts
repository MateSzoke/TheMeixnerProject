import { Component, OnInit } from '@angular/core';
import {PairingServiceService} from '../../backend_temp/pairing-service.service';

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {

  public members: {title: string, content1: string, content2: string}[];

  constructor(public pairingService :PairingServiceService) {
    this.members = pairingService.members;
  }

  public onModelChange1(newValue, index) {
    this.members[index].content1 = newValue;
    this.pairingService.members = this.members;
  }

  public onModelChange2(newValue, index) {
    this.members[index].content2 = newValue;
    this.pairingService.members = this.members;
  }

  public deleteItem(index) {
    this.members.splice(index,1);
    this.pairingService.members = this.members;
  }

  public newPair() {
    this.members.push({title: 'Title', content1: 'Subtitle', content2: 'Content here'});
  }

  ngOnInit(): void {
  }

}
