import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  EasyTasksService, MediaItemRequest,
  MediaItemResponse, MemoryGameRequest, MemoryGameResponse,
  PairElementRequest, PairElementResponse,
  TaskService
} from "../../../swagger-api";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectEnumUtil} from "../../util/subjectEnumUtil";
import {UpdateBlock} from "../../model/updateBlock";
import {Path} from "../../path";

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

  public memoryGameRequest: MemoryGameRequest;
  public taskId: number = null
  memGameElements: any;
  loaded: boolean = false
  newMemGame = true;
  memGameId = 0;

  constructor(public easyTasksService: EasyTasksService,
              public tasksService: TaskService,
              private route: ActivatedRoute,
              private cdRef:ChangeDetectorRef,
              private router : Router) {

  }

  ngOnInit(): void {
    this.taskId = Number.parseInt(this.route.snapshot.paramMap.get("taskId"))
    if (isNaN(this.taskId)) {
      this.initNewMemGameRequest()
    } else {
      this.newMemGame = false;
      this.initMemGameRequestById()
    }
  }

  initNewMemGameRequest() {
    let params = this.route.snapshot.paramMap;
    this.memoryGameRequest = new class implements MemoryGameRequest {
      pairs = new Array<PairElementRequest>()
      title = params.get("title")
      difficulty = Number.parseInt(params.get("difficulty"))
      subject = SubjectEnumUtil.stringToSubject(params.get("subject"))
      recommendedMinClass = Number.parseInt(params.get("recommendedMinClass"))
      recommendedMaxClass = Number.parseInt(params.get("recommendedMaxClass"))
    };
    this.loaded = true
  }

  initMemGameRequestById() {
    this.tasksService.getTaskByIdUsingGET(this.taskId).subscribe(
      (taskResponse) => {
        let memoryGameResponse = taskResponse as MemoryGameResponse
        this.memoryGameRequest = {
          title: memoryGameResponse.title,
          difficulty: memoryGameResponse.difficulty,
          recommendedMinClass: memoryGameResponse.recommendedMinClass,
          recommendedMaxClass: memoryGameResponse.recommendedMaxClass,
          pairs: memoryGameResponse.pairs.map(pair => this.pairingElementResponseToRequest(pair)),
          subject: memoryGameResponse.subject
        }
        this.loaded = true
        this.memGameId = memoryGameResponse.id;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  ngAfterViewChecked() {

  }

  public updatePairElement(indexService, event: UpdateBlock) {
    this.memoryGameRequest.pairs[indexService].pair[event.id].content = event.content;
  }

  public deletePair(indexService) {
    this.memoryGameRequest.pairs.splice(indexService, 1);
  }

  public addPairElement(indexPair) {
    const newRow: MediaItemRequest = {content: ''};
    if(this.memoryGameRequest.pairs[indexPair].pair.length < 2) {
      this.memoryGameRequest.pairs[indexPair].pair.push(newRow);
    }
  }

  public addPair() {
    const newRow: PairElementRequest = {
      pair: new Array<MediaItemRequest>()
    };
    this.memoryGameRequest.pairs.push(newRow);
  }

  public selectPair(jumpToElementIndex) {
    this.memGameElements[jumpToElementIndex].focus();
  }

  public deletePairElement(indexService, indexPair) {
    this.memoryGameRequest.pairs[indexService].pair.splice(indexPair, 1);
  }

  pairingElementResponseToRequest(response: PairElementResponse): PairElementRequest {
    return {
      pair: response.pair.map(mediaItem => this.mediaItemResponseToRequest(mediaItem))
    }
  }

  mediaItemResponseToRequest(response: MediaItemResponse): MediaItemRequest {
    return {
      content: response.content
    }
  }

  saveData() {
    if(this.newMemGame) {
      this.easyTasksService.createMemoryGameUsingPOST(this.memoryGameRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    } else {
      this.easyTasksService.updateMemoryGamedUsingPATCH(this.memGameId,this.memoryGameRequest)
        .subscribe(data => {
          this.router.navigate([Path.TASKS_MY]);
        });
    }
  }
}
