import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from '../tasks/task.service';
import {Task} from '../tasks/task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],

})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<[Task]>;
  taskTitle: string;
  editing = false;

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

  updateTask(idToEdit, taskTitle) {
    this.taskService.updateTask(idToEdit, {title: taskTitle});
    this.taskTitle = '';
  }

  toggleDone(task) {
    this.taskService.toggleDone(task);
  }

  estimateTime(){}

  addSubtask(){}

  onTaskDoneChanged(){

  }

  onTaskNotesChanged(){}

  focusLastFocusedTaskEl(){}
}
