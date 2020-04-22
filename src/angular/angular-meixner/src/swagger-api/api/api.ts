export * from './account.service';
import { AccountService } from './account.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './task.service';
import { TaskService } from './task.service';
export * from './theEasyTasks.service';
import { TheEasyTasksService } from './theEasyTasks.service';
export const APIS = [AccountService, BasicErrorControllerService, TaskService, TheEasyTasksService];
