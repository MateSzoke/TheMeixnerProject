import {Component, OnInit} from '@angular/core';
import {
  BlindMapRequest,
  BlindMapTag,
  ComplexTasksService,
  EasyTasksService,
  FreeTextRequest,
  GroupingAndSortingRequest,
  GroupingRequest,
  GroupListItemRequest,
  GroupRequest,
  MediaItemRequest,
  OddOneOutRequest,
  OtherTasksService,
  PairElementRequest,
  PairingRequest,
  Sentence,
  SentenceCompletionAndGroupingRequest,
  SentenceCompletionAndSortingRequest,
  SentenceCompletionItem,
  SentenceCompletionList,
  SentenceCompletionRequest,
  SentenceCreationAndGroupingRequest,
  SentenceCreationAndSortingRequest,
  SentenceCreationList,
  SentenceCreationRequest,
  SortingAndGroupingRequest,
  SortingRequest,
  TaskResponse,
  TimelineRequest,
  TimelineTag
} from '../../swagger-api';
import {GroupingResponse} from '../../swagger-api/model/groupingResponse';
import {ModalComponent} from '../modal/modal.component';
import {Observable} from 'rxjs';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectEnumUtil} from "../util/subjectEnumUtil";
import {TypeEnumUtil} from "../util/typeEnumUtil";
import TypeEnum = TaskResponse.TypeEnum;
import SubjectEnum = TaskResponse.SubjectEnum;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  submitted = false;

  public types: Array<string>;
  public subjects: Array<string>;
  public classes: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public classesTo: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private difficulty: number = -1;
  private classFrom: number = -1;
  private classTo: number = -1;
  public name: string = null;

  newTaskForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', Validators.required],
    difficulty: ['', Validators.required],
    classFrom: ['', Validators.required],
    classTo: ['', [Validators.required]],
    topic: ['', [Validators.required]]
  });

  public newTaskModel: NewTask = {
    title: "",
    type: TypeEnum.Grouping,
    difficulty: 50,
    classFrom: 4,
    classTo: 6,
    topic: SubjectEnum.Biology
  };

  ngOnInit(): void {
    this.types = new Array<string>();
    for (let taskType in TypeEnum) {
      this.types.push(TypeEnumUtil.taskTypeToString(taskType));
    }
    this.subjects = new Array<string>();
    for (let subject in SubjectEnum) {
      this.subjects.push(SubjectEnumUtil.subjectToString(subject));
    }
  }

  constructor(private modalC: ModalComponent,
              private theEasyTasksService: EasyTasksService,
              private complexTasksService: ComplexTasksService,
              private otherTasksService: OtherTasksService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewTaskComponent>) {

  }

  private testInsideFunction(input: string): String {
    return "this is what was returned";
  }


  private postTaskDataByType(input: string): Observable<any> {
    switch (input) {
      case GroupingResponse.TypeEnum.Grouping.toString(): {
        console.log("csoportositas POST called");
        const g1: GroupingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          groups: new Array<GroupRequest>(),
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.Pairing.toString(): {
        console.log("parositas POST called");
        const g1: PairingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          pairs: new Array<PairElementRequest>(),
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createPairingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletion.toString(): {
        console.log("mondatkieg POST called");
        const g1: SentenceCompletionRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          sentence: null,
          options: new Array<string>()
        };
        return this.theEasyTasksService.createSentenceCompletionUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreation.toString(): {
        console.log("mondatkeszites POST called");
        const g1: SentenceCreationRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          sentences: new Array<Sentence>(),
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createSentenceCreationUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.Sorting.toString(): {
        console.log("sorrendezes POST called");
        const g1: SortingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          elements: new Array<MediaItemRequest>(),
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          subject: "None"
        };
        return this.theEasyTasksService.createSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.GroupingAndSorting.toString(): {
        console.log("csoportositas es sorrendezes POST called");
        const g1: GroupingAndSortingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          groups: Array<GroupRequest>()
        };
        return this.complexTasksService.createGroupingAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndGrouping.toString(): {
        console.log("Mondatkiegeszites es csoportositas POST called");
        const g1: SentenceCompletionAndGroupingRequest = {
          sentenceGroups: Array<SentenceCompletionList>(),
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo
        };
        return this.complexTasksService.createSentenceCompletionAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndSorting.toString(): {
        console.log("Mondatkiegeszites es sorrendezes POST called");
        const g1: SentenceCompletionAndSortingRequest = {
          sentences: Array<SentenceCompletionItem>(),
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo
        };
        return this.complexTasksService.createSentenceCompletionAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndGrouping.toString(): {
        const g1: SentenceCreationAndGroupingRequest = {
          sentenceGroups: Array<SentenceCreationList>(),
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo
        };
        return this.complexTasksService.createSentenceCreationAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndSorting.toString(): {
        const g1: SentenceCreationAndSortingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          sentences: Array<Sentence>()
        };
        return this.complexTasksService.createSentenceCreationAndSortingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.SortingAndGrouping.toString(): {
        const g1: SortingAndGroupingRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          groups: Array<GroupListItemRequest>()
        };
        return this.complexTasksService.createSortingAndGroupingUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.BlindMap.toString(): {
        const g1: BlindMapRequest = {
          image: null,
          tags: Array<BlindMapTag>(),
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo
        };
        return this.otherTasksService.createBlindMapUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.FreeText.toString(): {
        const g1: FreeTextRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
          question: null,
          correctAnswer: null
        };
        return this.otherTasksService.createFreeTextUsingPOST(g1);
        break;
      }
      case GroupingResponse.TypeEnum.OddOneOut.toString(): {
        const g1: OddOneOutRequest = {
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo,
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
          title: this.newTaskForm.value.title,
          difficulty: this.newTaskForm.value.difficulty,
          subject: "None",
          recommendedMinClass: this.newTaskForm.value.classFrom,
          recommendedMaxClass: this.newTaskForm.value.classTo
        };
        return this.otherTasksService.createTimelineUsingPOST(g1);
        break;
      }
    }
  }

  saveData() {
    this.submitted = true;

    if (!this.newTaskForm.valid) {
      return;
    } else {
      this.dialogRef.close();
    }
    this.postTaskDataByType(this.newTaskModel.type.toString()).subscribe(
      data => {
        //ModalComponent.saveBtnPressed.unsubscribe();
      },
      error => {

      },
      () => {

      }
    );
  }
}

export interface NewTask {
  title: string;
  type: TypeEnum;
  difficulty: number;
  classFrom: number;
  classTo: number;
  topic: SubjectEnum;
}
