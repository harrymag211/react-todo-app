export type TaskType = 'Work' | 'Personal' | 'Study' | 'Other';

export interface Task {
  id: string;
  type: TaskType;
  description: string;
}
