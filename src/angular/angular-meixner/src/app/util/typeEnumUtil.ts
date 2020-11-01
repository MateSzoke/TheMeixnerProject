import {TaskResponse} from "../../swagger-api";
import TypeEnum = TaskResponse.TypeEnum;
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TypeEnumUtil {

  public static taskTypeToString(type: string): string {
    switch (type) {
      case "Pairing":
        return "Párosítás"
      case "Grouping":
        return "Csoportosítás"
      case "Sorting":
        return "Sorrendezés"
      case "SentenceCreation":
        return "Mondat készítés"
      case "SentenceCompletion":
        return "Mondat kiegészítés"
      case "TrueFalse":
        return "Igaz/Hamis"
      case "MemoryGame":
        return "Memóriajáték"
      case "GroupingAndSorting":
        return "Csoportosítás és sorrendezés"
      case "SentenceCreationAndSorting":
        return "Mondatkészítés és sorrendezés "
      case "SentenceCompletionAndSorting":
        return "Mondat kiegészítés és sorrendezés"
      case "SentenceCreationAndGrouping":
        return "Mondatkészítés és csoportosítás"
      case "SentenceCompletionAndGrouping":
        return "Mondat kiegészítés és csoportosítás"
      case "SortingAndGrouping":
        return "Sorrendezés és csoportosítás"
      case "BlindMap":
        return "Ágrajz/Vaktérkép"
      case "TimeLine":
        return "Időszalag"
      case "OddOneOut":
        return "Kakukktojás"
      case "FreeText":
        return "Szabadszöveges"
      case "Table":
        return "Táblázat"
    }
  }

  public static stringToTaskType(type: string): TypeEnum {
    switch (type) {
      case "Csoportosítás":
        return TypeEnum.Grouping
      case "Párosítás":
        return TypeEnum.Pairing
      case "Mondat kiegészítés":
        return TypeEnum.SentenceCompletion
      case "Mondat készítés":
        return TypeEnum.SentenceCreation
      case "Sorrendezés":
        return TypeEnum.Sorting
      case "Igaz/Hamis":
        return TypeEnum.TrueFalse
      case "Memóriajáték":
        return TypeEnum.MemoryGame
      case "Csoportosítás és sorrendezés":
        return TypeEnum.GroupingAndSorting
      case "Mondat kiegészítés és csoportosítás":
        return TypeEnum.SentenceCompletionAndGrouping
      case "Mondat kiegészítés és sorrendezés":
        return TypeEnum.SentenceCompletionAndSorting
      case "Mondatkészítés és csoportosítás":
        return TypeEnum.SentenceCreationAndGrouping
      case "Mondatkészítés és sorrendezés":
        return TypeEnum.SentenceCreationAndSorting
      case "Sorrendezés és csoportosítás":
        return TypeEnum.SortingAndGrouping
      case "Ágrajz/Vaktérkép":
        return TypeEnum.BlindMap
      case "Szabadszöveges":
        return TypeEnum.FreeText
      case "Kakukktojás":
        return TypeEnum.OddOneOut
      case "Időszalag":
        return TypeEnum.TimeLine
      case "Táblázat":
        return TypeEnum.Table
    }
  }

}
