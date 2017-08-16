import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-time-estimate',
  templateUrl: './dialog-time-estimate.component.html',
  styleUrls: ['./dialog-time-estimate.component.scss']
})
export class DialogTimeEstimateComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DialogTimeEstimateComponent>) {
  }

  ngOnInit() {
  }

}
