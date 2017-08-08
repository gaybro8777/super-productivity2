import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from './task.service';
import {Task} from './task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],

})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<[Task]>;
  taskTitle: string;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  // TODO remove from here to it's own component
  addTask(taskTitle) {
    this.taskService.addTask(taskTitle);
    this.taskTitle = '';
  }

  focusLastFocusedTaskEl(){}
}
