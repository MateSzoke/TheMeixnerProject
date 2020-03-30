import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modelElementId = "modal-container";

  private overlayElementId = 'overlay';

  constructor(private domService: DomService) { }

  init(component: any, inputs: Object, outputs: Object) {
    let componentconfig = {
      inputs: inputs,
      outputs: outputs,
    }

    this.domService.appendComponentTo(this.modelElementId, component, componentconfig);
    document.getElementById(this.modelElementId).className="show";
    document.getElementById(this.overlayElementId).className="show";
  }

  destroy(){
    this.domService.removeComponent();
    document.getElementById(this.modelElementId).className='hidden';
    document.getElementById(this.overlayElementId).className='hidden';
  }
}
