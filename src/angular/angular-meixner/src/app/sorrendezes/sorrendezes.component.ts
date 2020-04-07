import { Component, OnInit } from '@angular/core';
import {NewExerciseComponent} from '../new-exercise/new-exercise.component';

@Component({
  selector: 'app-sorrendezes',
  templateUrl: './sorrendezes.component.html',
  styleUrls: ['./sorrendezes.component.scss']
})
export class SorrendezesComponent implements OnInit {
  public inputArr:  Array<string> = ['1', '2', '3'];

  constructor() { }

  ngOnInit(): void {
  }


  public removeInput() {
    this.inputArr.splice(-1,1);
  }

  public newInput() {
    this.inputArr.push('4');
  }
}
