// import { Action } from '@ngrx/store';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const RELOAD_FROM_LS = 'RELOAD_FROM_LS';

const LS_KEY = 'tasks';

// export function TaskReducer(state = [], action: Action) {
export function TaskReducer(state = [], action: any) {
  switch (action.type) {
    case RELOAD_FROM_LS:
      const LS_INITIAL = JSON.parse(localStorage.getItem(LS_KEY));
      if (!LS_INITIAL || !Array.isArray(LS_INITIAL)) {
        localStorage.setItem(LS_KEY, JSON.stringify([]));
      }
      const lsTasks = JSON.parse(localStorage.getItem(LS_KEY));
      return [...lsTasks];

    case ADD_TASK:
      return [action.payload, ...state];
    case DELETE_TASK:
      return state.filter((item, index) => index !== action.payload);
    case UPDATE_TASK:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, {title: action.payload.newValue})
          : item;
      });
    case TOGGLE_DONE:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, {done: !action.payload.done})
          : item;
      });
    default:
      return state;
  }
}