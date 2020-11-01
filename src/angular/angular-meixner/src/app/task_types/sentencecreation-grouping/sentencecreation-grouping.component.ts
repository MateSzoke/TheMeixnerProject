import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  ComplexTasksService,
  Sentence,
  SentenceCreationAndGroupingRequest, SentenceCreationAndGroupingResponse, SentenceCreationList,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-sentencecreation-grouping',
  templateUrl: './sentencecreation-grouping.component.html',
  styleUrls: ['./sentencecreation-grouping.component.scss']
})
export class SentencecreationGroupingComponent implements OnInit {

  public sentenceCreationAndGroupingRequest: SentenceCreationAndGroupingRequest;
  public taskId: number = null
  @ViewChildren('groupchild') groups: QueryList<ElementRef>;
  groupElements: any;
  loaded: boolean = false
  newGrouping = true;
  groupingId = 0;

  constructor(public complexTasksService: ComplexTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private router: Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSentenceCreationAndGroupingRequest()
    } else {
      this.newGrouping = false;
      this.initSentenceCreationAndGroupingRequestById()
    }
  }

  initNewSentenceCreationAndGroupingRequest() {
    let params = this.route.snapshot.paramMap;
    this.sentenceCreationAndGroupingRequest = new class implements SentenceCreationAndGroupingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      sentenceGroups = new Array<SentenceCreationList>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initSentenceCreationAndGroupingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let sortingGroupingResponse = taskResponse as SentenceCreationAndGroupingResponse
        this.sentenceCreationAndGroupingRequest = {
          title: sortingGroupingResponse.title,
          difficulty: sortingGroupingResponse.difficulty,
          recommendedMinClass: sortingGroupingResponse.recommendedMinClass,
          recommendedMaxClass: sortingGroupingResponse.recommendedMaxClass,
          sentenceGroups: sortingGroupingResponse.sentenceGroups,
          subject: sortingGroupingResponse.subject
        }
        this.loaded = true
        this.groupingId = sortingGroupingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateSentencePart(sentenceGroupIndex, sentenceIndex, newValue: UpdateBlock) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups[sentenceGroupIndex].sentences[sentenceIndex].parts[newValue.id] = newValue.content;
  }

  public deleteSentencePart(indexElement, sentenceIndex, partIndex) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups[indexElement].sentences[sentenceIndex].parts.splice(partIndex, 1);
  }

  public addSentencePart(indexElement, sentenceIndex) {
    console.log("addSentencePart");
    const newRow = '';
    this.sentenceCreationAndGroupingRequest.sentenceGroups[indexElement].sentences[sentenceIndex].parts.push(newRow);
  }

  public deleteSentence(indexElement, indexService) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups[indexElement].sentences.splice(indexService, 1);
  }

  public addSentence(indexElement) {
    console.log("addSentence");
    const stringArray = new Array<string>();
    stringArray.push('');
    const newSentence =
      {
        sentenceTitle: '',
        parts: stringArray
      };
    this.sentenceCreationAndGroupingRequest.sentenceGroups[indexElement].sentences.push(newSentence);
  }

  public deleteSentenceGroup(indexService) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups.splice(indexService, 1);
  }

  public addSentenceGroup() {
    const newSentenceGroup =
      {
        groupTitle: '',
        sentences: new Array<Sentence>()
      } as SentenceCreationList;
    this.sentenceCreationAndGroupingRequest.sentenceGroups.push(newSentenceGroup);
  }

  saveData() {
    if (this.newGrouping) {
      this.complexTasksService.createSentenceCreationAndGroupingUsingPOST(this.sentenceCreationAndGroupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.complexTasksService.updateSentenceCreationAndGroupingByIdUsingPATCH(this.groupingId, this.sentenceCreationAndGroupingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

  changeGroupTitle(i: number, $event: any) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups[i].groupTitle = $event;
  }

  changeSentenceTitle(i: number, j: number, $event: any) {
    this.sentenceCreationAndGroupingRequest.sentenceGroups[i].sentences[j].sentenceTitle = $event;
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
