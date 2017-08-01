import {Component, OnInit} from '@angular/core';
import {TaskService} from '../tasks/task.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss'],
  providers: [TaskService],
})
export class WorkViewComponent implements OnInit {
  tasks$: Observable<any>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

}
