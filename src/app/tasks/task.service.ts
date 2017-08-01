import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Task} from './task'
import {Store} from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, RELOAD_FROM_LS, TOGGLE_DONE, UPDATE_TASK} from './task.actions';

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

  addTask(title) {
    this.store.dispatch({
      type: ADD_TASK,
      payload: {title, done: false}
    });
  }

  deleteTask(index) {
    this.store.dispatch({
      type: DELETE_TASK,
      payload: index
    });
  }


  updateTask(updatedTask, indexToEdit) {
    this.store.dispatch({
      type: UPDATE_TASK,
      payload: {
        index: indexToEdit, newValue: updatedTask
      }
    });
  }

  toggleDone(task, indexToToggle) {
    this.store.dispatch({
      type: TOGGLE_DONE,
      payload: {
        index: indexToToggle, done: task.done
      }
    });
  }

}