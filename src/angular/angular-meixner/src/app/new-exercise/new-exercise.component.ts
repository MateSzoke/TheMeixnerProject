import {Component, OnInit} from '@angular/core';
import {
  EasyTasksService,
  GroupingRequest,
  GroupRequest,
  MediaItemRequest,
  PairElementRequest,
  PairingRequest,
  Sentence,
  SentenceCompletionRequest,
  SentenceCreationRequest,
  SortingRequest
} from '../../swagger-api';
import {GroupingResponse} from '../../swagger-api/model/groupingResponse';
import {ConvertEnum} from '../model/ConvertEnum';
import {ModalComponent} from '../modal/modal.component';
import {Observable} from 'rxjs';

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
      this.types.push(ConvertEnum.convertType(i));
    }
  }

  constructor(private modalC: ModalComponent,
              private theEasyTasksService: EasyTasksService) {


    ModalComponent.saveBtnPressed.subscribe(data => {
      if(this.name == null || this.type == -1 || this.difficulty == -1 || this.classFrom == -1 || this.classTo == -1 || this.topic == -1) {
        console.log("szempontok: " + this.type + this.difficulty +
        this.classFrom + this.classTo + this.topic);

        alert("Kérem adja meg az összes szempontot!");
        return;
      } else {
        console.log("type is " + this.type);
        const g1: GroupingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          groups: new Array<GroupRequest>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        console.log(this.type + " type");
        let j = 0;
        for(let i in GroupingResponse.TypeEnum) {
          if(j == this.type) {
            console.log("j equals");
            this.postTaskDataByType(i).subscribe(
              data => {
                console.log("data sent");
              },
              error => {
                console.log("subscribe error");
              },
              () => {

              }
            );
          }
          j++;
        }
        ModalComponent.closeAfterSave(data);
      }
    });
  }

  private testInsideFunction(input: string) : String {
    console.log("testInsideFunction called" + input.toString());
    return "this is what was returned";
  }


  private postTaskDataByType(input: string) : Observable<any> {
    console.log("postTaskDataByType called");
    switch (input) {
      case GroupingResponse.TypeEnum.Grouping.toString(): {
        console.log("csoportositas POST called");
        const g1: GroupingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          groups: new Array<GroupRequest>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.Pairing.toString(): {
        console.log("parositas POST called");
        const g1: PairingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          pairs: new Array<PairElementRequest>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createPairingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletion.toString(): {
        console.log("mondatkieg POST called");
        const g1: SentenceCompletionRequest = {
          title: this.name,
          difficulty: this.difficulty,
          sentence: null,
          options: new Array<string>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createSentenceCompletionUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreation.toString(): {
        console.log("mondatkeszites POST called");
        const g1: SentenceCreationRequest = {
          title: this.name,
          difficulty: this.difficulty,
          sentences: new Array<Sentence>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createSentenceCreationUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.Sorting.toString(): {
        console.log("sorrendezes POST called");
        const g1: SortingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          elements: new Array<MediaItemRequest>(),
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.GroupingAndSorting.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndGrouping.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndSorting.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndGrouping.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndSorting.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.SortingAndGrouping.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.BlindMap.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.FreeText.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.OddOneOut.toString(): {
        return;
        break;
      }
      case GroupingResponse.TypeEnum.TimeLine.toString(): {
        return;
        break;
      }
    }
  }


  public setName(event) {
    this.name = event;
    console.log(this.name);
  }

  public typeSelected(event) {
    console.log("typeselected called");
    this.type = event.value;
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
