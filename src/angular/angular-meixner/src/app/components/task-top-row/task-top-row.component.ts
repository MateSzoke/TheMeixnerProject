import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Path} from "../../path";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saveData() {
    this.saveDataEmit.emit(true);
  }

  newElement() {
    this.newElementEmit.emit(true);
  }

  cancel() {
    this.router.navigate([Path.TASKS_MY]);
  }
}
