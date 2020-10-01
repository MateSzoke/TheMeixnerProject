import {TaskResponse} from "../../swagger-api";
import SubjectEnum = TaskResponse.SubjectEnum;

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

  public static stringToSubject(subject: string): SubjectEnum {
    switch (subject) {
      case "Biológia":
        return SubjectEnum.Biology
      case "Történelem":
        return SubjectEnum.History
      case "Idegen nyelv":
        return SubjectEnum.ForeignLanguage
      case "Matematika":
        return SubjectEnum.Mathematics
      case "Fizika":
        return SubjectEnum.Physics
      case "Magyar nyelv és irodalom":
        return SubjectEnum.HungarianGrammarAndLiterature
      case "Testnevelés":
        return SubjectEnum.Sport
      case "Ének-zene":
        return SubjectEnum.Music
      case "Technika, életvitel és gyakorlat":
        return SubjectEnum.Technique
      case "Erkölcstan/hittan":
        return SubjectEnum.EthicsReligion
      case "Környezetismeret":
        return SubjectEnum.KnowledgeEnvironment
      case "Mozgókép és médiaismeret":
        return SubjectEnum.VisualCulture
      case "Egyéb":
        return SubjectEnum.None
    }
  }
}
