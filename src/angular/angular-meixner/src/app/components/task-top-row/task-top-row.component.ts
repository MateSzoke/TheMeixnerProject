import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-top-row',
  templateUrl: './task-top-row.component.html',
  styleUrls: ['./task-top-row.component.scss']
})
export class TaskTopRowComponent implements OnInit {

  @Output() saveDataEmit = new EventEmitter<boolean>();
  @Output() newElementEmit = new EventEmitter<boolean>();
  @Input() title = '';
  @Input() type = '';
  @Input() plusButton = true;

  constructor() { }

  ngOnInit(): void {
  }

  saveData() {
    this.saveDataEmit.emit(true);
  }

  newElement() {
    this.newElementEmit.emit(true);
  }
}
