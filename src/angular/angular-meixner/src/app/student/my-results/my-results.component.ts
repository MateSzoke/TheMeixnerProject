import {Component, OnInit} from '@angular/core';
import {ResultsService} from "../../../swagger-api";
import {Router} from "@angular/router";
import {ExerciseResult} from "../../../swagger-api/model/exerciseResult";
import {TaskResultResponse} from "../../../swagger-api/model/taskResultResponse";
import {MatDialog} from "@angular/material/dialog";
import {SentenceCompletionResultComponent} from "../tasks/result/sentence-completion-result/sentence-completion-result.component";
import {AssignTask} from "../../../swagger-api/model/assignTask";
import {GroupingResultComponent} from "../tasks/result/grouping-result/grouping-result.component";
import {PairingResultComponent} from "../tasks/result/pairing-result/pairing-result.component";
import {SentenceCreationResultComponent} from "../tasks/result/sentence-creation-result/sentence-creation-result.component";
import {SortingResultComponent} from "../tasks/result/sorting-result/sorting-result.component";
import {TrueFalseResultComponent} from "../tasks/result/true-false-result/true-false-result.component";
import {ComponentType} from "@angular/cdk/overlay";
import TypeEnum = AssignTask.TypeEnum;

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss']
})
export class MyResultsComponent implements OnInit {
  loaded: boolean = false
  exercises: Array<ExerciseResult> = []

  constructor(
    private resultsService: ResultsService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.resultsService.getMyResultsUsingGET().subscribe(exercises => {
      this.exercises = exercises
      this.loaded = true
    })
  }

  private static getResultComponentByType(type: string): ComponentType<any> {
    switch (type) {
      case TypeEnum.Grouping.toString():
        return GroupingResultComponent;
      case TypeEnum.Pairing.toString():
        return PairingResultComponent;
      case TypeEnum.SentenceCompletion.toString():
        return SentenceCompletionResultComponent;
      case TypeEnum.SentenceCreation.toString():
        return SentenceCreationResultComponent;
      case TypeEnum.Sorting.toString():
        return SortingResultComponent;
      case TypeEnum.TrueFalse.toString():
        return TrueFalseResultComponent;
      case TypeEnum.GroupingAndSorting.toString():
        return null;
      case TypeEnum.SentenceCompletionAndGrouping.toString():
        return null;
      case TypeEnum.SentenceCompletionAndSorting.toString():
        return null;
      case TypeEnum.SentenceCreationAndGrouping.toString():
        return null;
      case TypeEnum.SentenceCreationAndSorting.toString():
        return null;
      case TypeEnum.SortingAndGrouping.toString():
        return null;
      case TypeEnum.BlindMap.toString():
        return null;
      case TypeEnum.FreeText.toString():
        return null;
      case TypeEnum.OddOneOut.toString():
        return null;
      case TypeEnum.TimeLine.toString():
        return null;
    }
  }

  getPercentage(percentage: number): string {
    if (isNaN(percentage)) {
      return "-"
    } else {
      return `${Math.round(percentage)} %`
    }
  }

  showExerciseResult(task: TaskResultResponse) {
    this.dialog.open(MyResultsComponent.getResultComponentByType(task.taskResult.type), {
      data: {taskResult: task.taskResult}
    })
  }
}
