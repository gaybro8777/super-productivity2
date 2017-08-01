import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import {ADD_TASK} from "./task.actions";

const LS_KEY = 'SUP';
const TASK_KEY = 'TASKS';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions,
              private store$: Store<any>) {
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

  // SYNCH WITH LS
  @Effect({dispatch: false}) addTask$: any = this.actions$
    .ofType(ADD_TASK)
    .withLatestFrom(this.store$)
    .do((state) => {
      console.log('I am here!');

      localStorage.setItem('tasks', JSON.stringify(state));
      return state;
    });

  // @Effect() addTask$ = this.actions$
  //   .ofType(ADD_TASK)
  //   .map(action => action.payload)
  //   .switchMap(task => this.taskService.addTask(task))
  //   .map(task => this.taskActions.addTaskSuccess(task));

  //
  // @Effect() deleteTask$ = this.actions$
  //   .ofType('DELETE_BLOG')
  //   .map(action => action.payload)
  //   .switchMap(task => this.taskService.deleteTask(task))
  //   .map(task => this.taskActions.deleteTaskSuccess(task));
}