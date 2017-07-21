import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, TOGGLE_DONE, UPDATE_TASK} from './tasks/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks$: Observable<any>;
  task: string;
  editing = false;
  indexToEdit: number | null;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.tasks$ = this.store.select('TaskReducer');
  }

  addTask(value) {
    this.store.dispatch({type: ADD_TASK, payload: {value, done: false}});
    this.task = '';
  }

  deleteTask(index) {
    this.store.dispatch({type: DELETE_TASK, payload: index});
  }

  editTask(task, index) {
    this.editing = true;
    this.task = task.value;
    this.indexToEdit = index;
  }

  cancelEdit() {
    this.editing = false;
    this.task = '';
    this.indexToEdit = null;
  }

  updateTask(updatedTask) {
    this.store.dispatch({type: UPDATE_TASK, payload: {index: this.indexToEdit, newValue: updatedTask}});
    this.task = '';
    this.indexToEdit = null;
    this.editing = false;
  }

  toggleDone(Task, index) {
    this.store.dispatch({type: TOGGLE_DONE, payload: {index, done: Task.done}});
  }
}