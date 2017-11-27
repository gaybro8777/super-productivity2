import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../tasks/task';
import {TaskUtilService} from '../../tasks/task-util.service';
import {TaskService} from '../../tasks/task.service';
import {formatWorklogDateStr} from '../../helper/format-worklog-date-str';
import * as moment from 'moment';

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
  isAddForAnotherDayFormVisible: boolean;
  timeSpentOnDayCopy: any;
  newEntry: any;


  constructor(public dialogRef: MatDialogRef<DialogTimeEstimateComponent>,
              private _taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = this.data.task;
    this.todayStr = TaskUtilService.getTodayStr();
    this._taskService = _taskService;
    this.taskCopy = Object.assign({}, this.task);
    this.timeSpentOnDayCopy = Object.assign({}, this.taskCopy.timeSpentOnDay);
    console.log(this.task);
    console.log(this.taskCopy);
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


  createEmptyNewEntryForADay() {
    return {
      date: '',
      timeSpent: ''
    };
  }

  showAddForAnotherDayForm() {
    this.newEntry = this.createEmptyNewEntryForADay();
    this.isAddForAnotherDayFormVisible = true;
  }

  addNewEntry() {
    console.log('SAVE', this.newEntry.date);

    const strDate = formatWorklogDateStr(this.newEntry.date);
    this.timeSpentOnDayCopy[strDate] = this.newEntry.timeSpent;
    this.timeSpentOnDayCopy = Object.assign({}, this.timeSpentOnDayCopy);
    console.log(strDate, this.timeSpentOnDayCopy);
    this.isAddForAnotherDayFormVisible = false;

  }

  deleteValue(strDate) {
    delete this.timeSpentOnDayCopy[strDate];
  }
}
