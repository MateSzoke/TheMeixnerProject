import {TaskResponse} from "../../swagger-api";

/***
 * Convert subject enum to hungarian text
 * subject list: https://eduline.hu/kozoktatas/Kerettantervek_tantargyak_listaja_6QN3E9
 */
export class SubjectEnumUtil {

  public static subjectToString(subject: string): string {
    switch (subject) {
      case "Biology":
        return "Biológia"
      case "History":
        return "Történelem"
      case "ForeignLanguage":
        return "Idegen nyelv"
      case "Mathematics":
        return "Matematika"
      case "Physics":
        return "Fizika"
      case "HungarianGrammarAndLiterature":
        return "Magyar nyelv és irodalom"
      case "Sport":
        return "Testnevelés"
      case "Music":
        return "Ének-zene"
      case "Technique":
        return "Technika, életvitel és gyakorlat"
      case "EthicsReligion":
        return "Erkölcstan/hittan"
      case "KnowledgeEnvironment":
        return "Környezetismeret"
      case "VisualCulture":
        return "Mozgókép és médiaismeret"
      case "None":
        return "Egyéb"
    }
  }
}
