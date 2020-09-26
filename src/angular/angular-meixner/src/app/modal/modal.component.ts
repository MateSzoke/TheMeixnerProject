import {Component, OnInit, ViewChild, ViewContainerRef, HostBinding, Output, EventEmitter} from '@angular/core';
import { DomService } from '../service/dom.service';
import {TasksComponent} from '../tasks/tasks.component';
import {Observable, Subject} from "rxjs";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @HostBinding('style.display') display = 'none';
  @ViewChild('content', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;
  static saveBtnPressed = new Subject<ModalComponent>();
  static closeBtnPressed = new Subject<ModalComponent>();
  title = "";
  static componentRef;

  constructor(private domService: DomService) {
    this.constructModal();
  }

  ngOnInit() {
    this.constructModal();
  }

  constructModal() {
    ModalComponent.componentRef = this;
    ModalComponent.saveBtnPressed = new Subject<ModalComponent>();
    ModalComponent.closeBtnPressed = new Subject<ModalComponent>();
    this.domService.setContainerRef(this.containerRef);
    this.domService.showContainerElement$.subscribe((value) => {
      if(value){
        this.display='block';
      }
    });
  }

  public cancel() {
    this.domService.setContainerRef(this.containerRef);
    this.domService.cancelComponent();
    this.display = 'none';
  }

  public savedata() {
    ModalComponent.saveBtnPressed.next(this);
    ModalComponent.saveBtnPressed = new Subject<ModalComponent>();
  }

  public static closeAfterSave() {
    ModalComponent.closeBtnPressed.next();
    ModalComponent.componentRef.domService.setContainerRef(ModalComponent.componentRef.containerRef);
    ModalComponent.componentRef.domService.cancelComponent();
    ModalComponent.componentRef.display = 'none';
  }

}
