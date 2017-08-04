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
  idToEdit: number | null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }


  addTask(taskTitle) {
    this.taskService.addTask(taskTitle);
    this.taskTitle = '';
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId);
  }


  startTask(taskId){
    this.taskService.setCurrentTask(taskId);
  }

  pauseTask(){
    this.taskService.pauseCurrentTask();
  }

  editTask(task) {
    this.editing = true;
    this.taskTitle = task.title;
    this.idToEdit = task.id;
  }

  cancelEdit() {
    this.editing = false;
    this.taskTitle = '';
    this.idToEdit = null;
  }

  updateTask(idToEdit, taskTitle) {
    this.taskService.updateTask(idToEdit, {title: taskTitle});
    this.taskTitle = '';
    this.editing = false;
  }

  toggleDone(task) {
    this.taskService.toggleDone(task);
  }
}
