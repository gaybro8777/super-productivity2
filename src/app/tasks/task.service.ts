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
  TOGGLE_DONE,
  UNSET_CURRENT_TASK,
  UPDATE_TASK,
  SYNC
} from './task.actions';


@Injectable()
export class TaskService {
  tasks$: Observable<Array<Task>>;

  constructor(private store: Store<any>) {
    this.tasks$ = this.store.select('TaskReducer');
    this.reloadFromLs();
  }

  reloadFromLs() {
    this.store.dispatch({
      type: RELOAD_FROM_LS
    });
  }

  sync(){
    this.store.dispatch({
      type: SYNC
    });
  }

  addTask(title) {
    this.store.dispatch({
      type: ADD_TASK,
      payload: {
        title,
        isDone: false
      }
    });
  }

  deleteTask(taskId) {
    this.store.dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
  }


  updateTask(taskId, changedFields) {
    this.store.dispatch({
      type: UPDATE_TASK,
      payload: {
        id: taskId,
        changedFields: changedFields
      }
    });
  }

  setCurrentTask(taskId) {
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

  toggleDone(taskId) {
    this.store.dispatch({
      type: TOGGLE_DONE,
      payload: taskId
    });
  }

  addSubTask(parentTask) {
    this.store.dispatch({
      type: ADD_SUB_TASK,
      payload: parentTask
    });
  }
}