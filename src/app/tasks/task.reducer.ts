// import { Action } from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, RELOAD_FROM_LS, TOGGLE_DONE, UPDATE_TASK} from './task.actions';

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
      console.log('RELOAD lsTasks', lsTasks);
      console.log('RELOAD localStorage.tasks', localStorage.tasks);
      console.log('RELOAD state', state);
      console.log(typeof lsTasks);

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