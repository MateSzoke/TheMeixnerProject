import {TaskResponse} from "../../swagger-api";
import TypeEnum = TaskResponse.TypeEnum;
import SubjectEnum = TaskResponse.SubjectEnum;

export interface UpdateBlock {
  id: number;
  mediaId: number;
  content: string;
}
