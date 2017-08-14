import {SET_TASK_DONE} from './tasks/task.actions'

function debug(reducer) {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);
    switch (action.type) {
      case SET_TASK_DONE:
        return reducer(state, action);
      default:
        return reducer(state, action);
    }
  }
}

export const metaReducers = [debug];
