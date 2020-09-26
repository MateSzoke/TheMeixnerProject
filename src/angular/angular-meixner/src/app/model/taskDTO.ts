import {TaskResponse} from "../../swagger-api";
import TypeEnum = TaskResponse.TypeEnum;
import SubjectEnum = TaskResponse.SubjectEnum;

export interface TaskDTO {
  id?: number;
  title: string;
  type: TypeEnum;
  difficulty: number;
  classFrom: number;
  classTo: number;
  topic: SubjectEnum;
  lastModified: string;
}
