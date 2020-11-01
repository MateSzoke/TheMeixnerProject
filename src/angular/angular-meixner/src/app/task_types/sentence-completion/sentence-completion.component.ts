import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  EasyTasksService,
  SentenceCompletionRequest,
  SentenceCompletionResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {Path} from "../../path";

@Component({
  selector: 'app-sentence-completion',
  templateUrl: './sentence-completion.component.html',
  styleUrls: ['./sentence-completion.component.scss']
})
export class SentenceCompletionComponent implements OnInit {

  public sentenceCompletionRequest: SentenceCompletionRequest;
  public taskId: number = null
  loaded: boolean = false
  newSentenceCompletion = true;
  sentenceCompletionId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private router: Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewSentenceCompletionRequest()
    } else {
      this.newSentenceCompletion = false;
      this.initSentenceCompletionRequestById()
    }
  }

  initNewSentenceCompletionRequest() {
    let params = this.route.snapshot.paramMap;
    this.sentenceCompletionRequest = new class implements SentenceCompletionRequest {
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
      sentence = new Array<string>()
      options = new Array<string>()
    };
    this.loaded = true
  }

  initSentenceCompletionRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        console.log("initSentenceCompletionRequestById");
        let sentenceCompletionResponse = taskResponse as SentenceCompletionResponse
        this.sentenceCompletionRequest = {
          title: sentenceCompletionResponse.title,
          difficulty: sentenceCompletionResponse.difficulty,
          subject: sentenceCompletionResponse.subject,
          recommendedMinClass: sentenceCompletionResponse.recommendedMinClass,
          recommendedMaxClass: sentenceCompletionResponse.recommendedMaxClass,
          sentence: sentenceCompletionResponse.sentenceTask,
          options: sentenceCompletionResponse.options
        }
        console.log(this.sentenceCompletionRequest.sentence);
        this.loaded = true
        this.sentenceCompletionId = sentenceCompletionResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public updateSentencePart(indexService, event: string) {
    this.sentenceCompletionRequest.sentence[indexService] = event;
  }

  public updateOptionsPart(indexService, event: string) {
    this.sentenceCompletionRequest.options[indexService] = event;
  }

  public addElement() {
    if(this.sentenceCompletionRequest.sentence.length > this.sentenceCompletionRequest.options.length) {
      this.sentenceCompletionRequest.options.push('');
    } else {
      this.sentenceCompletionRequest.sentence.push('');
    }
  }

  public deleteElement(indexService) {
    this.sentenceCompletionRequest.options.splice(indexService, 1);
    this.sentenceCompletionRequest.sentence.splice(indexService, 1);
  }

  public deleteLastOptions() {
    this.sentenceCompletionRequest.options.splice(this.sentenceCompletionRequest.options.length - 1, 1);
  }

  saveData() {
    if (this.newSentenceCompletion) {
      this.easyTasksService.createSentenceCompletionUsingPOST(this.sentenceCompletionRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.easyTasksService.updateSentenceCompletionByIdUsingPATCH(this.sentenceCompletionId, this.sentenceCompletionRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  getSelection($event) {
    console.log("getSelection");
    console.log(window.getSelection().toString());
  }
}
