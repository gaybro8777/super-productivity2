import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Task} from './task'
import {Store} from '@ngrx/store';
import {
  ADD_SUB_TASK,
  ADD_TASK,
  DELETE_TASK,
  RELOAD_FROM_LS,
  SET_CURRENT_TASK,
  SYNC,
  UNSET_CURRENT_TASK,
  UPDATE_TASK,
  SET_TASK_DONE,
  SET_TASK_UNDONE,
} from './task.actions';


@Injectable()
export class TaskService {
  tasks$: Observable<Array<Task>>;
  currentTask$: Observable<String>;

  constructor(private store: Store<any>) {
    this.tasks$ = this.store.select('TaskReducer');
    this.currentTask$ = this.store.select('CurrentTaskReducer');
    this.reloadFromLs();
  }

  reloadFromLs() {
    this.store.dispatch({
      type: RELOAD_FROM_LS
    });
  }

  sync() {
    this.store.dispatch({
      type: SYNC
    });
  }

  addTask(title: string) {
    this.store.dispatch({
      type: ADD_TASK,
      payload: {
        title,
        isDone: false
      }
    });
  }

  deleteTask(taskId: string) {
    this.store.dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
  }


  updateTask(taskId: string, changedFields: any) {
    this.store.dispatch({
      type: UPDATE_TASK,
      payload: {
        id: taskId,
        changedFields: changedFields
      }
    });
  }

  setCurrentTask(taskId: string) {
    this.store.dispatch({
      type: SET_CURRENT_TASK,
      payload: taskId,
    });
  }

  pauseCurrentTask() {
    this.store.dispatch({
      type: UNSET_CURRENT_TASK,
    });
  }

  setTaskDone(taskId: string) {
    this.store.dispatch({
      type: SET_TASK_DONE,
      payload: taskId,
    });
  }

  setTaskUnDone(taskId: string) {
    this.store.dispatch({
      type: SET_TASK_UNDONE,
      payload: taskId,
    });
  }


  addSubTask(parentTask: Task) {
    this.store.dispatch({
      type: ADD_SUB_TASK,
      payload: parentTask
    });
  }
}