import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-matinput-underline',
  templateUrl: './matinput-underline.component.html',
  styleUrls: ['./matinput-underline.component.scss']
})
export class MatinputUnderlineComponent implements OnInit {

  @Input() inputData = '';
  @Input() trashActive = false;
  @Output() onChangeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitData($event: string) {
    this.onChangeEvent.emit($event);
  }
}
