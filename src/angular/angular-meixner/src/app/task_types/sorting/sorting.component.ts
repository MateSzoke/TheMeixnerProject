import {Component, Input, OnInit} from '@angular/core';
import {MediaItemResponse, SortingResponse} from "../../../swagger-api";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  @Input() public members: Array<MediaItemResponse>;

  constructor() {

  }

  public deleteItem(index) {
    this.members.splice(index,1);
  }

  public newItem() {

  }

  ngOnInit(): void {
  }
}
