import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewTaskComponent} from "../new-task/new-task.component";

@Component({
  selector: 'app-universal-modal',
  templateUrl: './universal-modal.component.html',
  styleUrls: ['./universal-modal.component.scss']
})
export class UniversalModalComponent implements OnInit {

  //@ViewChild('modalContent', {static: true}) modalContent: NewTaskComponent;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    console.log("UniversalModalComponent called");
  }

  async openModal() {
    console.log("UniversalModalComponent openModal");
    this.modalService.open(NewTaskComponent);
  }

}
