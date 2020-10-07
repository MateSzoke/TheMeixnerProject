import {GroupingResponse, TaskResponse, UserRequest} from '../../swagger-api';
import {Path} from "../path";
import TypeEnum = TaskResponse.TypeEnum;
import RoleEnum = UserRequest.RoleEnum;

export class ConvertEnum {

  public static convertType(input: string): string {
    switch (input) {
      case GroupingResponse.TypeEnum.Grouping.toString(): {
        return 'csoportosítás';
      }
      case GroupingResponse.TypeEnum.Pairing.toString(): {
        return 'párosítás';
      }
      case GroupingResponse.TypeEnum.SentenceCompletion.toString(): {
        return 'mondatkiegészítés';
      }
      case GroupingResponse.TypeEnum.SentenceCreation.toString(): {
        return 'mondatkészítés';
      }
      case GroupingResponse.TypeEnum.Sorting.toString(): {
        return 'sorrendezés';
      }
      case GroupingResponse.TypeEnum.TrueFalse.toString(): {
        return 'igaz-hamis';
      }
      case GroupingResponse.TypeEnum.MemoryGame.toString(): {
        return 'memóriajáték';
      }
      case GroupingResponse.TypeEnum.GroupingAndSorting.toString(): {
        return 'csoportosítás és sorrendezés';
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndGrouping.toString(): {
        return 'mondatkiegészítés és csoportosítás';
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndSorting.toString(): {
        return 'mondatkiegészítés és sorrendezés';
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndGrouping.toString(): {
        return 'mondatkészítés és csoportosítás';
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndSorting.toString(): {
        return 'mondatkészítés és sorrendezés';
      }
      case GroupingResponse.TypeEnum.SortingAndGrouping.toString(): {
        return 'sorrendezés és csoportosítás';
      }
      case GroupingResponse.TypeEnum.BlindMap.toString(): {
        return 'memóriajáték';
      }
      case GroupingResponse.TypeEnum.FreeText.toString(): {
        return 'szabadszöveges feladatok';
      }
      case GroupingResponse.TypeEnum.OddOneOut.toString(): {
        return 'kakukktojás';
      }
      case GroupingResponse.TypeEnum.TimeLine.toString(): {
        return 'időszalag';
      }
    }
  }

  public static convertTypeToRouterLink(input: string): string {
    switch (input) {
      case TypeEnum.Grouping.toString(): {
        return Path.GROUPING;
      }
      case TypeEnum.Pairing.toString(): {
        return Path.PAIRING;
      }
      case TypeEnum.SentenceCompletion.toString(): {
        return Path.SENTENCE_COMPLETION;
      }
      case TypeEnum.SentenceCreation.toString(): {
        return Path.SENTENCE_CREATION;
      }
      case TypeEnum.Sorting.toString(): {
        return Path.SORTING;
      }
      case TypeEnum.GroupingAndSorting.toString(): {
        return Path.GROUPING_SORTING;
      }
      case TypeEnum.SentenceCompletionAndGrouping.toString(): {
        return Path.SENTENCE_COMPLETION_GROUPING;
      }
      case TypeEnum.SentenceCompletionAndSorting.toString(): {
        return Path.SENTENCE_COMPLETION_SORTING;
      }
      case TypeEnum.SentenceCreationAndGrouping.toString(): {
        return Path.SENTENCE_CREATION_GROUPING;
      }
      case TypeEnum.SentenceCreationAndSorting.toString(): {
        return Path.SENTENCE_CREATION_SORTING;
      }
      case TypeEnum.SortingAndGrouping.toString(): {
        return Path.SORTING_GROUPING;
      }
      case TypeEnum.BlindMap.toString(): {
        return Path.MEMORY_GAME;
      }
      case TypeEnum.FreeText.toString(): {
        return Path.FREE_TEXT;
      }
      case TypeEnum.OddOneOut.toString(): {
        return Path.ODD_ONE_OUT;
      }
      case TypeEnum.TimeLine.toString(): {
        return Path.TIMELINE;
      }
    }
  }

  public static convertRoleToString(input: string): string {
    switch (input) {
      case UserRequest.RoleEnum.ADMIN.toString():
        return 'Admin';
      case UserRequest.RoleEnum.STUDENT.toString():
        return 'Tanuló';
    }
  }

  public static convertStringToRoleEnum(input: string): RoleEnum {
    switch (input) {
      case 'Admin':
        return RoleEnum.ADMIN;
      case 'Tanuló':
        return RoleEnum.STUDENT;
    }
  }

}
