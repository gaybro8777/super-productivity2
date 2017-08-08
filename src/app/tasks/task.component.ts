import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {TaskService} from './task.service';
import {EventEmitter} from '@angular/core';
import {Output} from '@angular/core';

// import {Task} from './task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    'class': 'mat-elevation-z4'
  }
})
export class TaskComponent implements OnInit {
  // @Input() task: Task;
  @Input() task: any;
  // @Output() taskUpdated: EventEmitter<any> = new EventEmitter();


  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
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

  updateTask(idToEdit, taskTitle) {
    this.taskService.updateTask(idToEdit, {title: taskTitle});
    // todo focus task again
  }

  toggleDone(task) {
    this.taskService.toggleDone(task);
  }

  estimateTime(){}

  addSubTask(task){
    this.taskService.addSubTask(task);
  }

  onTaskDoneChanged(){

  }

  focusTask(){}


  onTaskNotesChanged(){}
}
