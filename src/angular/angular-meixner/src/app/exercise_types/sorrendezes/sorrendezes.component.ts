import { Component, OnInit } from '@angular/core';
import {NewExerciseComponent} from '../../new-exercise/new-exercise.component';
import {PairingServiceService} from '../../backend_temp/pairing-service.service';
import {SortingService} from '../../backend_temp/sorting.service';

@Component({
  selector: 'app-sorrendezes',
  templateUrl: './sorrendezes.component.html',
  styleUrls: ['./sorrendezes.component.scss']
})
export class SorrendezesComponent implements OnInit {
  public members: {title: string, list: {content: string}[]}[];

  constructor(public sortingService :SortingService) {
    this.members = sortingService.members;
  }

  public onModelChange1(newValue, index) {
    this.sortingService.members = this.members;
  }

  public onModelChange2(newValue, index) {
    this.sortingService.members = this.members;
  }

  public deleteItem(index) {
    this.members.splice(index,1);
    this.sortingService.members = this.members;
  }

  public newItem() {
    this.members.push({title: 'Title', list: [{content: "elso"}, {content: "masodik"}, {content: "harmadik"}]});
  }

  ngOnInit(): void {
  }
}
