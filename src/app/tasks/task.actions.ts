import {Injectable} from '@angular/core';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';

@Injectable()
export class TaskActions {
  static REQUEST_TASKS = REQUEST_TASKS;

  loadTasks(): any {
    return {
      type: TaskActions.REQUEST_TASKS
    };
  }

  static LOAD_TASKS_SUCCESS = LOAD_TASKS_SUCCESS;

  loadTasksSuccess(tasks): any {
    return {
      type: TaskActions.LOAD_TASKS_SUCCESS,
      payload: tasks
    };
  }

  static ADD_TASK_SUCCESS = ADD_TASK_SUCCESS;

  addTaskSuccess(task): any {
    return {
      type: TaskActions.ADD_TASK_SUCCESS,
      payload: task
    };
  }

  static DELETE_TASK_SUCCESS = DELETE_TASK_SUCCESS;

  deleteTaskSuccess(task): any {
    return {
      type: TaskActions.DELETE_TASK_SUCCESS,
      payload: task
    };
  }
}

