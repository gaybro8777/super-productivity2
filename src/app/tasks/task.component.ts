import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {HostBinding} from '@angular/core';
import {DoCheck} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {TaskService} from './task.service';
import {Observable} from 'rxjs/Observable';
import {DragulaService} from 'ng2-dragula';
import shortid from 'shortid'

// import {Task} from './task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    'class': 'mat-elevation-z4'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, DoCheck {
  // @Input() task: Task;
  @Input() task: any;
  @HostBinding('class.is-done') isDone: boolean = false;
  @HostBinding('class.is-current') isCurrent: boolean = false;
  currentTask$: Observable<string>;

  // @Output() taskUpdated: EventEmitter<any> = new EventEmitter();


  subTaskListId: string;


  // @Output() taskUpdated: EventEmitter<any> = new EventEmitter();


  constructor(private taskService: TaskService, private _dragulaService: DragulaService) {
  }

  ngDoCheck() {
    this.isDone = this.task.isDone;
  }

  ngOnInit() {
    this.currentTask$ = this.taskService.currentTask$;
    this.currentTask$.subscribe((val) => {
      this.isCurrent = (this.task && val === this.task.id);
    });

    this.subTaskListId = shortid();
    this._dragulaService.setOptions(this.subTaskListId, {
      moves: function (el, container, handle) {
        return handle.className.indexOf('handle-sub') > -1;
      }
    });
  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId);
  }


  startTask(taskId) {
    this.taskService.setCurrentTask(taskId);
  }

  pauseTask() {
    this.taskService.pauseCurrentTask();
  }

  updateTask(idToEdit, taskTitle) {
    this.taskService.updateTask(idToEdit, {title: taskTitle});
    // todo focus task again
  }

  estimateTime() {
  }

  addSubTask(task) {
    this.taskService.addSubTask(task);
  }

  // TODO refactor to action ?
  onTaskDoneChanged(taskId, isDone) {
    if (isDone) {
      this.taskService.setTaskDone(taskId);
    } else {
      this.taskService.setTaskUnDone(taskId);
    }
  }

  focusTask() {
  }


  onTaskNotesChanged() {
  }
}
