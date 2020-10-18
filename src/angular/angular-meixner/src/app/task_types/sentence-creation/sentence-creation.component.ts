import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  EasyTasksService, MediaItemRequest,
  MediaItemResponse,
  PairElementRequest, PairElementResponse,
  PairingRequest, PairingResponse, Sentence, SentenceCreationRequest, SentenceCreationResponse,
  TaskService
} from "../../../swagger-api";
import {TaskAngularService} from "../../data/task-angular.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";

@Component({
  selector: 'app-sentence-creation',
  templateUrl: './sentence-creation.component.html',
  styleUrls: ['./sentence-creation.component.scss']
})
export class SentenceCreationComponent implements OnInit {

  public sentenceCreationRequest: SentenceCreationRequest;
  public taskId: number = null
  @ViewChildren('sentencechild') sentences: QueryList<ElementRef>;
  sentenceParts: any;
  loaded: boolean = false
  newSentence = true;
  sentenceId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSentenceCreationRequest()
    } else {
      this.newSentence = false;
      this.initSentenceCreationRequestById()
    }
  }

  initNewSentenceCreationRequest() {
    let params = this.route.snapshot.paramMap;
    this.sentenceCreationRequest = new class implements SentenceCreationRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      sentences = new Array<Sentence>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initSentenceCreationRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let sentenceCreationResponse = taskResponse as SentenceCreationResponse
        this.sentenceCreationRequest = {
          title: sentenceCreationResponse.title,
          difficulty: sentenceCreationResponse.difficulty,
          recommendedMinClass: sentenceCreationResponse.recommendedMinClass,
          recommendedMaxClass: sentenceCreationResponse.recommendedMaxClass,
          sentences: sentenceCreationResponse.sentences,
          subject: sentenceCreationResponse.subject
        }
        this.loaded = true
        this.sentenceId = sentenceCreationResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateSentenceCreationRequest(newValue, indexService, indexSentence) {
    console.log("updateSentenceCreationRequest");
    console.log(newValue);
    console.log(indexSentence);
    this.sentenceCreationRequest.sentences[indexService].parts[indexSentence] = newValue.toString();
  }

  public deleteSentence(indexService) {
    this.sentenceCreationRequest.sentences.splice(indexService, 1);
  }

  public addSentenceRequest(indexElement) {
    const newRow = '';
    this.sentenceCreationRequest.sentences[indexElement].parts.push(newRow);
  }

  public newSentenceCreation() {
    const newRow: Sentence = {
      sentenceTitle: '',
      parts: new Array<string>()
    };
    this.sentenceCreationRequest.sentences.push(newRow);
  }

  public deletePart(indexService, indexSentence) {
    this.sentenceCreationRequest.sentences[indexService].parts.splice(indexSentence, 1);
  }

  sentenceCreationResponseToRequest(response: Sentence): Sentence {
    return {
      sentenceTitle: response.sentenceTitle,
      parts: response.parts
    }
  }

  saveData() {
    if(this.newSentence) {
      this.easyTasksService.createSentenceCreationUsingPOST(this.sentenceCreationRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    } else {
      this.easyTasksService.updateSentenceCreationByIdUsingPATCH(this.sentenceId,this.sentenceCreationRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS]);
        });
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

}
