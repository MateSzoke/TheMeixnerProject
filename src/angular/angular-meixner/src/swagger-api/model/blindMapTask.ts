import {BlindMapTag} from "./blindMapTag";
import {MediaItemResponse} from "./mediaItemResponse";
import {AssignTask} from "./assignTask";
import TypeEnum = AssignTask.TypeEnum;

export interface BlindMapTask {
  taskId: number;
  title: string;
  image: MediaItemResponse;
  tags: Array<BlindMapTag>;
  type: TypeEnum;
}
