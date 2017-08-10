export class Task {
  id: string;
  title: string;
  isDone?: boolean;
  notes?: string;
  parentId?: string;
  subTasks?: [Task];
}