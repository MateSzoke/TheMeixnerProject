import {GroupingResponse} from '../../swagger-api';

export class ConvertEnumToHun {

  public static convert(input: string): string {
    switch (input) {
      case GroupingResponse.TypeEnum.Grouping.toString(): {
        return "csoportosítás";
        break;
      }
      case GroupingResponse.TypeEnum.Pairing.toString(): {
        return "párosítás";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletion.toString(): {
        return "mondatkiegészítés";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreation.toString(): {
        return "mondatkészítés";
        break;
      }
      case GroupingResponse.TypeEnum.Sorting.toString(): {
        return "sorrendezés";
        break;
      }
      case GroupingResponse.TypeEnum.GroupingAndSorting.toString(): {
        return "csoportosítás és sorrendezés";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndGrouping.toString(): {
        return "mondatkiegészítés és csoportosítás";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCompletionAndSorting.toString(): {
        return "mondatkiegészítés és sorrendezés";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndGrouping.toString(): {
        return "mondatkészítés és csoportosítás";
        break;
      }
      case GroupingResponse.TypeEnum.SentenceCreationAndSorting.toString(): {
        return "mondatkészítés és sorrendezés";
        break;
      }
      case GroupingResponse.TypeEnum.SortingAndGrouping.toString(): {
        return "sorrendezés és csoportosítás";
        break;
      }
      case GroupingResponse.TypeEnum.BlindMap.toString(): {
        return "memóriajáték";
        break;
      }
      case GroupingResponse.TypeEnum.FreeText.toString(): {
        return "szabadszöveges feladatok";
        break;
      }
      case GroupingResponse.TypeEnum.OddOneOut.toString(): {
        return "kakukktojás";
        break;
      }
      case GroupingResponse.TypeEnum.TimeLine.toString(): {
        return "időszalag";
        break;
      }
    }

  }

}
