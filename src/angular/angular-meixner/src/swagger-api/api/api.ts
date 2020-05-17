export * from './account.service';
import {AccountService} from './account.service';
import {BasicErrorControllerService} from './basicErrorController.service';
import {ComplexTasksService} from './complexTasks.service';
import {EasyTasksService} from './easyTasks.service';
import {ExercisesService} from './exercises.service';
import {FilesService} from './files.service';
import {OtherTasksService} from './otherTasks.service';
import {TaskService} from './task.service';

export * from './basicErrorController.service';
export * from './complexTasks.service';
export * from './easyTasks.service';
export * from './exercises.service';
export * from './files.service';
export * from './otherTasks.service';
export * from './task.service';
export const APIS = [AccountService, BasicErrorControllerService, ComplexTasksService, EasyTasksService, ExercisesService, FilesService, OtherTasksService, TaskService];
