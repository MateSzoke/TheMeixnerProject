import {TaskResponse, UserRequest} from '../../swagger-api';
import {Path} from "../path";
import TypeEnum = TaskResponse.TypeEnum;
import RoleEnum = UserRequest.RoleEnum;

export class ConvertEnum {

  public static convertType(input: string): string {
    switch (input) {
      case TypeEnum.Grouping.toString(): {
        return 'csoportosítás';
      }
      case TypeEnum.Pairing.toString(): {
        return 'párosítás';
      }
      case TypeEnum.SentenceCompletion.toString(): {
        return 'mondatkiegészítés';
      }
      case TypeEnum.SentenceCreation.toString(): {
        return 'mondatkészítés';
      }
      case TypeEnum.Sorting.toString(): {
        return 'sorrendezés';
      }
      case TypeEnum.TrueFalse.toString(): {
        return 'igaz-hamis';
      }
      case TypeEnum.MemoryGame.toString(): {
        return 'memóriajáték';
      }
      case TypeEnum.GroupingAndSorting.toString(): {
        return 'csoportosítás és sorrendezés';
      }
      case TypeEnum.SentenceCompletionAndGrouping.toString(): {
        return 'mondatkiegészítés és csoportosítás';
      }
      case TypeEnum.SentenceCompletionAndSorting.toString(): {
        return 'mondatkiegészítés és sorrendezés';
      }
      case TypeEnum.SentenceCreationAndGrouping.toString(): {
        return 'mondatkészítés és csoportosítás';
      }
      case TypeEnum.SentenceCreationAndSorting.toString(): {
        return 'mondatkészítés és sorrendezés';
      }
      case TypeEnum.SortingAndGrouping.toString(): {
        return 'sorrendezés és csoportosítás';
      }
      case TypeEnum.BlindMap.toString(): {
        return 'memóriajáték';
      }
      case TypeEnum.FreeText.toString(): {
        return 'szabadszöveges feladatok';
      }
      case TypeEnum.OddOneOut.toString(): {
        return 'kakukktojás';
      }
      case TypeEnum.TimeLine.toString(): {
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
      case TypeEnum.TrueFalse.toString(): {
        return Path.TRUEFALSE;
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

  public static convertTypeToStudentRouterLink(input: string): string {
    switch (input) {
      case TypeEnum.Grouping.toString():
        return Path.STUDENT_GROUPING;
      case TypeEnum.Pairing.toString():
        return Path.STUDENT_PAIRING;
      case TypeEnum.MemoryGame.toString():
        return Path.STUDENT_MEMORY_GAME;
      case TypeEnum.SentenceCompletion.toString():
        return Path.STUDENT_SENTENCE_COMPLETION;
      case TypeEnum.SentenceCreation.toString():
        return Path.STUDENT_SENTENCE_CREATION;
      case TypeEnum.Sorting.toString():
        return Path.STUDENT_SORTING;
      case TypeEnum.TrueFalse.toString():
        return Path.STUDENT_TRUEFALSE;
      case TypeEnum.GroupingAndSorting.toString():
        return Path.STUDENT_GROUPING_SORTING;
      case TypeEnum.SentenceCompletionAndGrouping.toString():
        return Path.STUDENT_SENTENCE_COMPLETION_GROUPING;
      case TypeEnum.SentenceCompletionAndSorting.toString():
        return Path.STUDENT_SENTENCE_COMPLETION_SORTING;
      case TypeEnum.SentenceCreationAndGrouping.toString():
        return Path.STUDENT_SENTENCE_CREATION_GROUPING;
      case TypeEnum.SentenceCreationAndSorting.toString():
        return Path.STUDENT_SENTENCE_CREATION_SORTING;
      case TypeEnum.SortingAndGrouping.toString():
        return Path.STUDENT_SORTING_GROUPING;
      case TypeEnum.BlindMap.toString():
        return Path.STUDENT_BLINDMAP;
      case TypeEnum.FreeText.toString():
        return Path.STUDENT_FREE_TEXT;
      case TypeEnum.OddOneOut.toString():
        return Path.STUDENT_ODD_ONE_OUT;
      case TypeEnum.TimeLine.toString():
        return Path.STUDENT_TIMELINE;
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
