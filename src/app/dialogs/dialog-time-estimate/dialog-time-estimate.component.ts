import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Task} from '../../tasks/task';
import {TaskUtilService} from '../../tasks/task-util.service';

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
  timeEstimate: any;
  showAddForAnotherDayForm: boolean;
  timeSpentOnDayCopy: any;
  newEntry: any;


  constructor(public dialogRef: MatDialogRef<DialogTimeEstimateComponent>) {
    this.todayStr = TaskUtilService.getTodayStr();
    this.taskCopy = Object.assign({}, this.task);
    this.timeSpentOnDayCopy = this.taskCopy.timeSpentOnDay || {};


  }

  ngOnInit() {
  }

  submit() {
    console.log(this, arguments);

  }

  addNewEntry() {
  }

  deleteValue() {
  }
}
