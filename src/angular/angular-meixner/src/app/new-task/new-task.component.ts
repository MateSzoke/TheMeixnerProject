import {Component, OnInit} from '@angular/core';
import {
  EasyTasksService,
  GroupingRequest,
  ComplexTasksService,
  GroupRequest,
  MediaItemRequest,
  PairElementRequest,
  PairingRequest,
  Sentence,
  SentenceCompletionRequest,
  SentenceCreationRequest,
  SortingRequest,
  GroupingAndSortingRequest,
  SentenceCompletionAndGroupingRequest,
  SentenceCompletionAndSortingRequest,
  SentenceCompletionItem,
  SentenceCreationAndGroupingRequest,
  SentenceCreationList,
  SentenceCompletionList,
  SentenceCreationAndSortingRequest,
  SortingAndGroupingRequest,
  GroupListItemRequest,
  BlindMapTag,
  BlindMapRequest,
  OtherTasksService, FreeTextRequest, OddOneOutRequest, TimelineRequest, TimelineTag
} from '../../swagger-api';
import {GroupingResponse} from '../../swagger-api/model/groupingResponse';
import {ConvertEnum} from '../model/ConvertEnum';
import {ModalComponent} from '../modal/modal.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

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
              private theEasyTasksService: EasyTasksService,
              private complexTasksService: ComplexTasksService,
              private otherTasksService: OtherTasksService) {


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


  private postTaskDataByType(input: string): Observable<any> {
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
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          sentence: null,
          options: new Array<string>()
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
        console.log("csoportositas es sorrendezes POST called");
        const g1: GroupingAndSortingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          groups: Array<GroupRequest>()
        };
        return this.complexTasksService.createGroupingAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndGrouping.toString(): {
        console.log("Mondatkiegeszites es csoportositas POST called");
        const g1: SentenceCompletionAndGroupingRequest = {
          sentenceGroups: Array<SentenceCompletionList>(),
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo
        };
        return this.complexTasksService.createSentenceCompletionAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndSorting.toString(): {
        console.log("Mondatkiegeszites es sorrendezes POST called");
        const g1: SentenceCompletionAndSortingRequest = {
          sentences: Array<SentenceCompletionItem>(),
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo
        };
        return this.complexTasksService.createSentenceCompletionAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndGrouping.toString(): {
        const g1: SentenceCreationAndGroupingRequest = {
          sentenceGroups: Array<SentenceCreationList>(),
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo
        };
        return this.complexTasksService.createSentenceCreationAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndSorting.toString(): {
        const g1: SentenceCreationAndSortingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          sentences: Array<Sentence>()
        };
        return this.complexTasksService.createSentenceCreationAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SortingAndGrouping.toString(): {
        const g1: SortingAndGroupingRequest = {
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          groups: Array<GroupListItemRequest>()
        };
        return this.complexTasksService.createSortingAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.BlindMap.toString(): {
        const g1: BlindMapRequest = {
          image: null,
          tags: Array<BlindMapTag>(),
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo
        };
        return this.otherTasksService.createBlindMapUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.FreeText.toString(): {
        const g1: FreeTextRequest = {
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          question: null,
          correctAnswer: null
        };
        return this.otherTasksService.createFreeTextUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.OddOneOut.toString(): {
        const g1: OddOneOutRequest = {
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo,
          correctAnswerIndex: null,
          options: Array<MediaItemRequest>()
        };
        return this.otherTasksService.createOddOneOutUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.TimeLine.toString(): {
        const g1: TimelineRequest = {
          timelineType: TimelineRequest.TimelineTypeEnum.DATE,
          minimumDate: null,
          maximumDate: null,
          minimumInt: 0,
          maximumInt: 0,
          minimumDouble: 0,
          maximumDouble: 0,
          timelineTags: Array<TimelineTag>(),
          title: this.name,
          difficulty: this.difficulty,
          subject: "None",
          recommendedMinClass: this.classFrom,
          recommendedMaxClass: this.classTo
        };
        return this.otherTasksService.createTimelineUsingPOST(g1);
        break;
      }
    }
  }


  public setName(event) {
    this.name = event;
  }

  public typeSelected(event) {
    this.type = event.value;
  }

  public difficultySelected(event) {
    this.difficulty = event.value;
    console.log(event.value);
  }

  public classFromSelected(event) {
    this.classFrom = event.value;
    this.classesTo = new Array<number>();
    for(let i = this.classFrom; i < 13; i++) {
      this.classesTo.push(i);
    }
  }

  public classToSelected(event) {
    this.classTo = event.value;
  }

  public topicSelected(event) {
    this.topic = event.value;
  }
}
