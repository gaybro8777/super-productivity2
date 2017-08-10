import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from './task.service';
import {Task} from './task'
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],

})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<[Task]>;
  taskTitle: string;

  constructor(private taskService: TaskService, private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe(() => {
      taskService.sync();
    });
    dragulaService.setOptions('lvl1-task-list', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle') > -1;
      }
    });
  }

  ngOnInit() {
  }

  // TODO remove from here to it's own component
  addTask(taskTitle) {
    this.taskService.addTask(taskTitle);
    this.taskTitle = '';
  }

  focusLastFocusedTaskEl() {
  }
}
