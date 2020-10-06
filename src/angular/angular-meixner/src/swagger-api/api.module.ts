import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Configuration} from './configuration';
import {HttpClient} from '@angular/common/http';


import {AccountService} from './api/account.service';
import {BasicErrorControllerService} from './api/basicErrorController.service';
import {ComplexTasksService} from './api/complexTasks.service';
import {EasyTasksService} from './api/easyTasks.service';
import {ExercisesService} from './api/exercises.service';
import {FilesService} from './api/files.service';
import {OtherTasksService} from './api/otherTasks.service';
import {ResultsService} from './api/results.service';
import {TaskService} from './api/task.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AccountService,
    BasicErrorControllerService,
    ComplexTasksService,
    EasyTasksService,
    ExercisesService,
    FilesService,
    OtherTasksService,
    ResultsService,
    TaskService]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
