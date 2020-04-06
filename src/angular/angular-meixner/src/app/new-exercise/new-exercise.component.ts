import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../swagger-api';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {

  public tipusok: Array<string> = ['csoportositas', 'parositas', 'sorrendezes', 'mondatkiegeszites'];
  public nehezsegek:  Array<string> = ['konnyu', 'kozepes', 'nehez'];
  public temakorok:  Array<string> = ['Történelem', 'Fizika', 'Matematika', 'Biológia'];
  public osztalyok:  Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];

  ngOnInit(): void {
  }

  constructor() { }

}
