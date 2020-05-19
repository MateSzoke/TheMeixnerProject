import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import {Subject} from 'rxjs';
import {IChildConfig} from './contents';

@Injectable({
  providedIn: 'root'
})

export class DomService {
  private childComponentRef: any;
  private containerRef: ViewContainerRef;
  showContainerElement$= new Subject();
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) { }

  public setContainerRef(ref: ViewContainerRef) {
    this.containerRef = ref;
  }

  public eagerLoad(component) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector);
    this.containerRef.insert(componentRef.hostView);
  }

  public show(component) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector);
    this.showContainerElement$.next(true);
    this.containerRef.insert(componentRef.hostView);
  }

  public cancelComponent() {
    this.containerRef.clear();
  }
  public appendComponentTo(parentId: string, child: any, childConfig: IChildConfig) {
    const childComponentref = this.componentFactoryResolver.resolveComponentFactory(child)
      .create(this.injector);
    this.attachConfig(childConfig, childComponentref);
    this.childComponentRef = childComponentref;
    this.appRef.attachView(childComponentref.hostView)
    const childDomElement = (childComponentref.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.getElementById(parentId).appendChild(childDomElement);
  }

  public removeComponent() {
    console.log("remove called");
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }
  private attachConfig(config: IChildConfig, componentRef) {
    let inputs = config.inputs;
    let outputs = config.outputs;
    for (var key in inputs) {
      componentRef.instance[key] = inputs[key];
    }
    for (var key in outputs) {
      componentRef.instance[key] = outputs[key]
    }
  }

}
