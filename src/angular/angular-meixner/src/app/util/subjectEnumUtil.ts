import {TaskResponse} from "../../swagger-api";
import SubjectEnum = TaskResponse.SubjectEnum;

/***
 * Convert subject enum to hungarian text
 * subject list: https://eduline.hu/kozoktatas/Kerettantervek_tantargyak_listaja_6QN3E9
 */
export class SubjectEnumUtil {

  public static subjectToString(subject: string): string {
    switch (subject) {
      case SubjectEnum.Biology.toString():
        return "Biológia"
      case SubjectEnum.History.toString():
        return "Történelem"
      case SubjectEnum.ForeignLanguage.toString():
        return "Idegen nyelv"
      case SubjectEnum.Mathematics.toString():
        return "Matematika"
      case SubjectEnum.Physics.toString():
        return "Fizika"
      case SubjectEnum.HungarianGrammarAndLiterature.toString():
        return "Magyar nyelv és irodalom"
      case SubjectEnum.Sport.toString():
        return "Testnevelés"
      case SubjectEnum.Music.toString():
        return "Ének-zene"
      case SubjectEnum.Technique.toString():
        return "Technika, életvitel és gyakorlat"
      case SubjectEnum.EthicsReligion.toString():
        return "Erkölcstan/hittan"
      case SubjectEnum.KnowledgeEnvironment.toString():
        return "Környezetismeret"
      case SubjectEnum.VisualCulture.toString():
        return "Mozgókép és médiaismeret"
      case SubjectEnum.None.toString():
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
