import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../tasks/task';
import {TaskUtilService} from '../../tasks/task-util.service';
import {TaskService} from '../../tasks/task.service';

@Component({
  selector: 'sup-dialog-time-estimate',
  templateUrl: './dialog-time-estimate.component.html',
  styleUrls: ['./dialog-time-estimate.component.scss'],
  providers: [TaskUtilService],
})
export class DialogTimeEstimateComponent implements OnInit {
  todayStr: string;
  task: Task;
  taskCopy: Task;
  showAddForAnotherDayForm: boolean;
  timeSpentOnDayCopy: any;
  newEntry: any;


  constructor(public dialogRef: MatDialogRef<DialogTimeEstimateComponent>,
              private _taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = this.data.task;
    this.todayStr = TaskUtilService.getTodayStr();
    this._taskService = _taskService;
    this.taskCopy = Object.assign({}, this.task);
    this.timeSpentOnDayCopy = this.taskCopy.timeSpentOnDay || {};
    console.log(this.task);
  }

  ngOnInit() {
  }

  submit() {
    console.log(this, arguments);
    console.log(this.taskCopy);
    console.log(this.task);

    this._taskService.updateTask(this.taskCopy.id, {
      timeEstimate: this.taskCopy.timeEstimate,
      timeSpentOnDay: this.timeSpentOnDayCopy,
    });

  }

  addNewEntry() {
  }

  deleteValue() {
  }
}
