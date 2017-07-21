import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable'
import {Action} from "@ngrx/store";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import {of} from 'rxjs/observable/of';
import {TaskService} from "./task.service";
import {TaskActions} from "./task.actions";

@Injectable()
export class TaskEffects {
  constructor(private taskService: TaskService,
              private taskActions: TaskActions,
              private actions$: Actions) {
  }

  // @Effect()
  // loadTasks$: Observable<Action> = this.actions$
  //   .ofType('REQUEST_TASKS')
  //   .map(toPayload)
  //   .switchMap(payload => this.taskService.loadTasks(/*payload*/))
  //   .map((tasks: any) => this.taskActions.loadTasksSuccess(tasks)
  //     .catch(() => of({
  //       type: 'SOME_ERROR'
  //     }))
  //   );

  // @Effect() addTask$ = this.actions$
  //   .ofType('ADD_BLOG')
  //   .map(action => action.payload)
  //   .switchMap(task => this.taskService.addTask(task))
  //   .map(task => this.taskActions.addTaskSuccess(task));
  //
  //
  // @Effect() deleteTask$ = this.actions$
  //   .ofType('DELETE_BLOG')
  //   .map(action => action.payload)
  //   .switchMap(task => this.taskService.deleteTask(task))
  //   .map(task => this.taskActions.deleteTaskSuccess(task));
}