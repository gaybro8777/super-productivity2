import * as moment from 'moment';


export const calcTotalTimeSpent = (timeSpentOnDay) => {
  const totalTimeSpent = moment.duration();
  Object.keys(timeSpentOnDay).forEach(strDate => {
    if (timeSpentOnDay[strDate]) {
      totalTimeSpent.add(moment.duration(timeSpentOnDay[strDate]).asSeconds(), 's');
    }
  });

  if (totalTimeSpent.asMinutes() > 0) {
    return totalTimeSpent;
  } else {
    return undefined;
  }
};

export const fixMomentDate = (str) => {
  return moment.duration(str);
};

const propsToFix = ['timeEstimate', 'timeSpent'];
export const fixMomentDatesForTask = (task) => {
  propsToFix.forEach((prop) => {
    if (task[prop]) {
      task[prop] = fixMomentDate(task[prop]);
    }
    if (task.timeSpentOnDay) {
      const timeSpentOnDay = task.timeSpentOnDay;
      Object.keys(timeSpentOnDay).forEach(strDate => {
        if (timeSpentOnDay[strDate]) {
          timeSpentOnDay[strDate] = fixMomentDate(timeSpentOnDay[strDate]);
        }
      });
    }
  });
};

export const parseFromLs = (lsKey) => {
  const tasks = JSON.parse(localStorage.getItem(lsKey));

  tasks.forEach((task) => {
    fixMomentDatesForTask(task);
    if (task.subTasks) {
      task.subTasks.forEach((subTask) => {
        fixMomentDatesForTask(subTask);
      });
    }
  });

  return tasks;
};
