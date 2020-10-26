import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  ComplexTasksService,
  Sentence, SentenceCreationAndSortingRequest, SentenceCreationAndSortingResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-sentencecreation-sorting',
  templateUrl: './sentencecreation-sorting.component.html',
  styleUrls: ['./sentencecreation-sorting.component.scss']
})
export class SentencecreationSortingComponent implements OnInit {

  public sentenceCreationAndSortingRequest: SentenceCreationAndSortingRequest;
  public taskId: number = null
  loaded: boolean = false
  newSentence = true;
  sentenceId = 0;

  constructor(public complexTasksService: ComplexTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSentenceCreationAndSortingRequest()
    } else {
      this.newSentence = false;
      this.initSentenceCreationAndSortingRequestById()
    }
  }

  initNewSentenceCreationAndSortingRequest() {
    let params = this.route.snapshot.paramMap;
    this.sentenceCreationAndSortingRequest = new class implements SentenceCreationAndSortingRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      sentences = new Array<Sentence>()
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
    };
    this.loaded = true
  }

  initSentenceCreationAndSortingRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let sentenceCreationAndSortingResponse = taskResponse as SentenceCreationAndSortingResponse
        this.sentenceCreationAndSortingRequest = {
          title: sentenceCreationAndSortingResponse.title,
          difficulty: sentenceCreationAndSortingResponse.difficulty,
          recommendedMinClass: sentenceCreationAndSortingResponse.recommendedMinClass,
          recommendedMaxClass: sentenceCreationAndSortingResponse.recommendedMaxClass,
          sentences: sentenceCreationAndSortingResponse.sentences,
          subject: sentenceCreationAndSortingResponse.subject
        }
        this.loaded = true
        this.sentenceId = sentenceCreationAndSortingResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateSentenceCreationRequest(newValue: UpdateBlock, indexService) {
    this.sentenceCreationAndSortingRequest.sentences[indexService].parts[newValue.id] = newValue.content;
  }

  public deleteSentence(indexService) {
    this.sentenceCreationAndSortingRequest.sentences.splice(indexService, 1);
  }

  public addSentenceRequest(indexElement) {
    const newRow = '';
    this.sentenceCreationAndSortingRequest.sentences[indexElement].parts.push(newRow);
  }

  public addSentenceCreation() {
    const newRow: Sentence = {
      sentenceTitle: '',
      parts: new Array<string>()
    };
    this.sentenceCreationAndSortingRequest.sentences.push(newRow);
  }

  public deletePart(indexService, indexSentence) {
    this.sentenceCreationAndSortingRequest.sentences[indexService].parts.splice(indexSentence, 1);
  }

  saveData() {
    if(this.newSentence) {
      this.complexTasksService.createSentenceCreationAndSortingUsingPOST(this.sentenceCreationAndSortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.complexTasksService.updateSentenceCreationAndSortingByIdUsingPATCH(this.sentenceId,this.sentenceCreationAndSortingRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  onTitleChange(index: number, $event: string) {
    this.sentenceCreationAndSortingRequest.sentences[index].sentenceTitle = $event;
  }
}
