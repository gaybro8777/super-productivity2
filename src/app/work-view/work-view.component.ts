import {Component, OnInit} from '@angular/core';
import {TaskService} from '../tasks/task.service';
import {Observable} from 'rxjs/Observable';
import {Task} from '../tasks/task'
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss'],
  providers: [TaskService],
})
export class WorkViewComponent implements OnInit {
  tasks$: Observable<[Task]>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this._taskService.tasks$;
    const subscribe = this._taskService.model$
      .takeUntil(this.destroyed$)
      .subscribe(vals => {
        console.log(vals);
        // this.selectNextTask(vals.lastCurrentTask, vals.tasks);
      });
  }


  // selectNextTask(lastCurrentTask: Task, tasks: Task[]) {
  //   const undoneTasks = tasks.filter(task => !task.isDone);
  //
  //   if (lastCurrentTask) {
  //     if (lastCurrentTask.parentId) {
  //       const curParent = tasks.find(task => task.id === lastCurrentTask.parentId);
  //       console.log(curParent);
  //       const firstUndoneSubTask = curParent.subTasks.find(task => !task.isDone);
  //       if (firstUndoneSubTask) {
  //         this._taskService.setCurrentTask(firstUndoneSubTask.id);
  //       }
  //     }
  //
  //     if (undoneTasks && undoneTasks.length > 0) {
  //       const firstUndone = undoneTasks[0];
  //       if (firstUndone.subTasks && firstUndone.subTasks.length > 0) {
  //         const firstUndoneSubTask = firstUndone.subTasks.find(task => !task.isDone);
  //         if (firstUndoneSubTask) {
  //           this._taskService.setCurrentTask(firstUndoneSubTask.id);
  //         }
  //       } else {
  //         this._taskService.setCurrentTask(firstUndone.id);
  //       }
  //     }
  //   }
  // }

}
