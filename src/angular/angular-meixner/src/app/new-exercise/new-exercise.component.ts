import {Component, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from '../../swagger-api';
import {GroupingResponse} from '../../swagger-api/model/groupingResponse';
import {newArray} from '@angular/compiler/src/util';
import {ConvertEnumToHun} from '../model/ConvertEnumToHun';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {

  public types: Array<string> = ['csoportositas', 'parositas', 'sorrendezes', 'mondatkiegeszites'];
  public difficulties:  Array<string> = ['konnyu', 'kozepes', 'nehez'];
  public topics:  Array<string> = ['Történelem', 'Fizika', 'Matematika', 'Biológia'];
  public classes:  Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  public classesTo:  Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  private type : number = -1;
  private difficulty : number =-1;
  private classFrom: number = -1;
  private classTo: number = -1;
  private topic: number = -1;
  public name: string = null;

  ngOnInit(): void {
    this.types = new Array<string>();
    for(let i in GroupingResponse.TypeEnum) {
      this.types.push(ConvertEnumToHun.convert(i));
    }
  }

  constructor(private modalC: ModalComponent) {
    ModalComponent.saveBtnPressed.subscribe(data => {
      console.log("save button pressed");
      if(this.name == null || this.type == -1 || this.difficulty == -1 || this.classFrom == -1 || this.classTo == -1 || this.topic == -1) {
        console.log("szempontok: " + this.type + this.difficulty +
        this.classFrom + this.classTo + this.topic);
        
        alert("Kérem adja meg az összes szempontot!");
        return;
      } else {
        ModalComponent.closeAfterSave(data);
      }
    });
  }

  public setName(event) {
    this.name = event;
    console.log(this.name);
  }

  public typeSelected(event) {
    console.log("typeselected called");
    this.type = event.value;
    console.log(event.value);
  }

  public difficultySelected(event) {
    console.log("difficultySelected called ");
    console.log(event);
    this.difficulty = event.value;
    console.log(event.value);
  }

  public classFromSelected(event) {
    console.log("classFromSelected called");
    this.classFrom = event.value;
    this.classesTo = new Array<number>();
    for(let i = this.classFrom; i < 13; i++) {
      this.classesTo.push(i);
    }
    console.log(event.value);
  }

  public classToSelected(event) {
    console.log("classToSelected called");
    this.classTo = event.value;
    console.log(event.value);
  }

  public topicSelected(event) {
    console.log("topicSelected called");
    this.topic = event.value;
    console.log(event.value);
  }
}
