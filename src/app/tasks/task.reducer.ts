// import { Action } from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, RELOAD_FROM_LS, TOGGLE_DONE, UPDATE_TASK} from './task.actions';
import {LS_TASKS} from '../app.constants'

// export function TaskReducer(state = [], action: Action) {
export function TaskReducer(state = [], action: any) {
  switch (action.type) {
    case RELOAD_FROM_LS:
      const LS_INITIAL = JSON.parse(localStorage.getItem(LS_TASKS));
      if (!LS_INITIAL || !Array.isArray(LS_INITIAL)) {
        localStorage.setItem(LS_TASKS, JSON.stringify([]));
      }
      const lsTasks = JSON.parse(localStorage.getItem(LS_TASKS));
      return [...lsTasks];

    case ADD_TASK:
      return [action.payload, ...state];

    case DELETE_TASK:
      return state.filter((item) => item.id !== action.payload);

    case UPDATE_TASK:
      return state.map((item) => {
        return item.id === action.payload.id
          ? Object.assign({}, item, action.payload.changedFields)
          : item;
      });

    case TOGGLE_DONE:
      return state.map((item) => {
        return item.id === action.payload.id
          ? Object.assign({}, item, {done: !action.payload.done})
          : item;
      });

    default:
      return state;
  }
}