import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Task} from './task'
import {Store} from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, TOGGLE_DONE, UPDATE_TASK, RELOAD_FROM_LS} from './task.actions';

@Injectable()
export class TaskService {
  private LS_KEY = 'SUP';
  private TASK_KEY = 'TASKS';
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

  addTask(task) {
    this.store.dispatch({
      type: ADD_TASK,
      payload: {task, done: false}
    });
    // localStorage.tasks.push(task);
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