import { Component, OnInit, ViewChild, ViewContainerRef, HostBinding } from '@angular/core';
import { DomService } from '../service/dom.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @HostBinding('style.display') display = 'none';
  @ViewChild('content', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;
  title = "";
  constructor(private domService: DomService) {
    this.domService.setContainerRef(this.containerRef);
    this.domService.showContainerElement$.subscribe((value) => {
      if(value){
        this.display='block';
      }
    })
  }

  ngOnInit() {
    this.domService.setContainerRef(this.containerRef);
    this.domService.showContainerElement$.subscribe((value) => {
      if(value){
        this.display='block';
      }
    })
  }

  cancel() {
    this.domService.setContainerRef(this.containerRef);
    this.domService.cancelComponent();
    this.display = 'none';
  }

  savedata() {
    this.domService.setContainerRef(this.containerRef);
    this.domService.cancelComponent();
    this.display = 'none';
  }
}
