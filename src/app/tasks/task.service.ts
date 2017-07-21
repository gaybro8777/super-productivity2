import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Task} from './task'

@Injectable()
export class TaskService {
  private LS_KEY = 'SUP';
  private TASK_KEY = 'TASKS';

  constructor() {
    if(!localStorage.tasks){
      localStorage.tasks = [];
    }
  }

  loadTasks(): Observable<Task[]> {
    return localStorage.tasks;
  }

  addTask(task: Task) {
    localStorage.tasks.push(task);
  }

  deleteTask(task: Task): any {
  }
}