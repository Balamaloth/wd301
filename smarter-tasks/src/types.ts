export interface TaskItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface TaskAppState {
  tasks: TaskItem[];
}

export interface TaskListProps {
  tasks: TaskItem[];
  deleteTask: (idx: number) => void;
}

export interface TaskProps {
  title: string;
  description: string;
  date: Date;
  deleteTask: () => void;
}
