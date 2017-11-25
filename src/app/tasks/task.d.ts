export class Task {
  id: string;
  title: string;
  isDone?: boolean;
  notes?: string;
  parentId?: string;
  subTasks?: [Task];
  progress?: number;
  timeSpent?: any;
  timeEstimate?: any;
  timeSpentOnDay?: Object;
}