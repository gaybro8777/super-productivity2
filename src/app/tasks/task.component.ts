import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {HostBinding} from '@angular/core';
import {DoCheck} from '@angular/core';
import {TaskService} from './task.service';

// import {Task} from './task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    'class': 'mat-elevation-z4'
  }
})
export class TaskComponent implements OnInit, DoCheck {
  // @Input() task: Task;
  @Input() task: any;
  @HostBinding('class.is-done') isDone: boolean = false;

  // @Output() taskUpdated: EventEmitter<any> = new EventEmitter();


  constructor(private taskService: TaskService) {
  }

  ngDoCheck() {
    this.isDone = this.task.isDone;
  }

  ngOnInit() {
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
  onTaskDoneChanged(task) {
    this.taskService.sync();
  }

  focusTask() {
  }


  onTaskNotesChanged() {
  }
}
