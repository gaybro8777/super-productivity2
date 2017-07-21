import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {TaskService} from './tasks/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TaskService],
})
export class AppComponent implements OnInit {
  tasks$: Observable<any>;
  task: string;
  editing = false;
  indexToEdit: number | null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

  addTask(value) {
    this.taskService.addTask(value);
    this.task = '';
  }

  deleteTask(index) {
    this.taskService.deleteTask(index);
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
    this.taskService.updateTask(updatedTask, this.indexToEdit);
    this.task = '';
    this.indexToEdit = null;
    this.editing = false;
  }

  toggleDone(task, indexToToggle) {
    this.taskService.toggleDone(task, indexToToggle);
  }
}