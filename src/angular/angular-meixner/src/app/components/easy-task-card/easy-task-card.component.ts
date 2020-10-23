import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediaItemRequest} from "../../../swagger-api";
import {UpdateBlock} from "../../model/updateBlock";
import {strict} from "assert";

@Component({
  selector: 'app-easy-task-card',
  templateUrl: './easy-task-card.component.html',
  styleUrls: ['./easy-task-card.component.scss']
})
export class EasyTaskCardComponent implements OnInit {

  @Output() deleteBlockEmit = new EventEmitter<boolean>();
  @Output() deleteBlockElementEmit = new EventEmitter<number>();
  @Output() updateBlockElementEmit = new EventEmitter<UpdateBlock>();
  @Output() addBlockElementEmit = new EventEmitter<number>();
  @Output() titleChange = new EventEmitter<string>();

  @Input() listItems: MediaItemRequest[] | string[];
  @Input() singleton = false;
  @Input() deleteDisable = false;
  @Input() titleExists = false;
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

  public deleteBlock() {
    this.deleteBlockEmit.emit(true);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  isListItemsString(): boolean {
    return typeof this.listItems[0] === 'string';
  }

  updateBlockElement($event: string, j: number) {
    this.updateBlockElementEmit.emit({id: j, content: $event} as UpdateBlock);
  }

  deleteBlockElement(j: number) {
    this.deleteBlockElementEmit.emit(j);
  }

  addBlockElement() {
    this.addBlockElementEmit.emit(1);
  }

  onTitleChange($event: string) {
    this.titleChange.emit($event);
  }
}
