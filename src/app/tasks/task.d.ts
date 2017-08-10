export class Task {
  id: string;
  title: string;
  isDone?: boolean;
  isCurrent?: boolean;
  notes?: string;
  parentId?: string;
  subTasks?: [Task];
}