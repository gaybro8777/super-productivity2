import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from '../tasks/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],

})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<any>;
  taskTitle: string;
  editing = false;
  indexToEdit: number | null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }


  addTask(taskTitle) {
    this.taskService.addTask(taskTitle);
    this.taskTitle = '';
  }

  deleteTask(index) {
    this.taskService.deleteTask(index);
  }

  editTask(task, index) {
    this.editing = true;
    this.taskTitle = task.title;
    this.indexToEdit = index;
  }

  cancelEdit() {
    this.editing = false;
    this.taskTitle = '';
    this.indexToEdit = null;
  }

  updateTask(updatedTask) {
    this.taskService.updateTask(updatedTask, this.indexToEdit);
    this.taskTitle = '';
    this.indexToEdit = null;
    this.editing = false;
  }

  toggleDone(task, indexToToggle) {
    this.taskService.toggleDone(task, indexToToggle);
  }
}
