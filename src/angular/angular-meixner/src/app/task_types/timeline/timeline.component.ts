import {Component, OnInit, ViewChild} from '@angular/core';
import {Slider} from "./slider";
import {MatSlider} from "@angular/material/slider";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @ViewChild("matSlider1") _slider1: MatSlider;
  @ViewChild("matSlider2") _slider2: MatSlider;
  @ViewChild("matSlider3") _slider3: MatSlider;


  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value1 = 0;
  value2 = 0;
  value3 = 0;
  sliders = new Array<Slider>();
  bs= "bullsh"

  vertical = false;

  constructor() {
  }

  ngOnInit(): void {
    this.sliders.push({value: 20, color: 'thumbred', color2: 'red'});
    this.sliders.push({value: 40, color: 'thumbyellow', color2: 'yellow'});
    this.sliders.push({value: 44, color: 'thumbyellowgreen', color2: 'yellowgreen'});
    this.sliders.push({value: 66, color: 'thumborange', color2: 'orange'});
  }

  ujElem() {
    this.sliders.push({value: 42, color: 'thumbblue', color2: 'blue'});
  }

}

