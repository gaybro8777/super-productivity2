// import { Action } from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, RELOAD_FROM_LS, TOGGLE_DONE, UPDATE_TASK} from './task.actions';

// export function TaskReducer(state = [], action: Action) {
export function TaskReducer(state = [], action: any) {
  switch (action.type) {
    case RELOAD_FROM_LS:
      if (!localStorage.tasks || typeof  Array.isArray(localStorage.tasks)) {
        localStorage.setItem('tasks', JSON.stringify([]));
      }
      const lsTasks = JSON.parse(localStorage.getItem('tasks'));
      console.log('RELOAD', localStorage.tasks, lsTasks, state);
      return [...lsTasks];

    case ADD_TASK:
      console.log(state);
      return [action.payload, ...state];
    case DELETE_TASK:
      return state.filter((item, index) => index !== action.payload);
    case UPDATE_TASK:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, {value: action.payload.newValue})
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