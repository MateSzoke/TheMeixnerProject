import {TaskResponse} from "../../swagger-api";

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
      case "SentenceCompletionAndSorting": return "Mondat kiegészítés és sorrendezés"
      case "SentenceCreationAndGrouping": return "Mondat kiegészítés és csoportosítás"
      case "SentenceCompletionAndGrouping": return "Sorrendezés és csoportosítá"
      case "SortingAndGrouping": return "Párosítás"
      case "BlindMap": return "Ágrajz/Vaktérkép"
      case "TimeLine": return "Időszalag"
      case "OddOneOut": return "Kakukktojás"
      case "FreeText": return "Szabadszöveges"
      case "Table": return "Táblázat"
    }
  }

}
