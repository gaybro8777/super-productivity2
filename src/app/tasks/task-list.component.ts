import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from './task.service';
import {Task} from './task'
import {DragulaService} from 'ng2-dragula';
import shortid from 'shortid'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],

})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<[Task]>;
  @Input() filterArgs: string;

  taskTitle: string;
  taskListId: string;

  constructor(private _taskService: TaskService, private _dragulaService: DragulaService) {
    this.taskListId = shortid();

    _dragulaService.dropModel.subscribe(() => {
      _taskService.sync();
    });
    _dragulaService.setOptions(this.taskListId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle-par') > -1;
      }
    });
  }

  ngOnInit() {
  }

  // TODO remove from here to it's own component
  addTask(taskTitle) {
    this._taskService.addTask(taskTitle);
    this.taskTitle = '';
  }

  focusLastFocusedTaskEl() {
  }
}
