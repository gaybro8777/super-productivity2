import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Task} from '../../tasks/task';

@Component({
  selector: 'app-dialog-time-estimate',
  templateUrl: './dialog-time-estimate.component.html',
  styleUrls: ['./dialog-time-estimate.component.scss']
})
export class DialogTimeEstimateComponent implements OnInit {
  todayStr: string;
  task: Task;
  taskCopy: Task;
  timeEstimate: any;
  showAddForAnotherDayForm: boolean;
  timeSpentOnDayCopy: any;
  newEntry: any;


  constructor(public dialogRef: MatDialogRef<DialogTimeEstimateComponent>) {
    // this.todayStr = TasksUtil.getTodayStr();
    this.todayStr = '12/12/12';
    this.taskCopy = Object.assign({}, this.task);
    this.timeSpentOnDayCopy = this.taskCopy.timeSpentOnDay || {};


  }

  ngOnInit() {
  }

  submit() {
  }

  addNewEntry() {
  }

  deleteValue() {
  }
}
