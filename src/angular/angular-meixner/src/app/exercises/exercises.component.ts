import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public today = new Date();
  public actualMonth = this.today.getMonth().toString().padStart(2, '0');
  public tantargyak:Array<String> = ['történelem', "matematika"];
  public evfolyamok = Array.from({ length: (8 - 5) / 1 + 1}, (_, i) => 5 + (i * 1));
  public osztalyok:Array<String> = ['a', 'b', 'c'];

  constructor() { }

  ngOnInit(): void {
  }

  public newTask() {

  }

}
