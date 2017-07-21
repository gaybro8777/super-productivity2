// import { Action } from '@ngrx/store';
import {ADD_TASK, DELETE_TASK, TOGGLE_DONE, UPDATE_TASK} from './task.actions';


// export function TaskReducer(state = [], action: Action) {
export function TaskReducer(state = [], action: any) {
  switch (action.type) {
    case ADD_TASK:
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