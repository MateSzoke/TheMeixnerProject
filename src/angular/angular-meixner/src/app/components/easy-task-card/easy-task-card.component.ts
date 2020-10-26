import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilesService, MediaItemRequest} from "../../../swagger-api";
import {UpdateBlock} from "../../model/updateBlock";

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
  @Output() imageId = new EventEmitter<UpdateBlock>();

  @Input() listItemsMedia: MediaItemRequest[];
  @Input() listItemsString: string[];
  @Input() isMediaList = true;
  @Input() singleton = false;
  @Input() deleteDisable = false;
  @Input() titleExists = false;
  @Input() title = '';

  constructor(public filesService: FilesService) {
  }

  ngOnInit(): void {

  }

  public deleteBlock() {
    this.deleteBlockEmit.emit(true);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
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

  uploadFileToElement(j: number, event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.filesService.uploadUsingPOST(file).subscribe(data => {
        this.imageId.emit({id: j, mediaId: data.mediaItemId} as UpdateBlock);
      });
    }
  }

  mediaIdUndef(mediaItem): boolean {
    return typeof mediaItem === 'undefined';
  }
}
