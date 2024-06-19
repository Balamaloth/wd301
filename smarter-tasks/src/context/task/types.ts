export type ColumnsType = {
  [k in AvailableColumnsType]: ColumnDataType;
};

export type TaskDetailsPayloadType = Omit<
  TaskDetailsType,
  "assignee" | "state" | "id"
>;

export type TasksType = {
  [k: string]: TaskDetailsType;
};

export interface TaskListStateType {
  isLoading: boolean;
  isError: boolean;
  projectData: ProjectDataType;

  errorMessage: string;
}

export enum TaskListAvailableAction {
  UPDATE_TASK_REQUEST = "UPDATE_SPECIFIC_TASK_REQUEST",
  UPDATE_TASK_SUCCESS = "UPDATE_SPECIFIC_TASK_SUCCESS",
  UPDATE_TASK_FAILURE = "UPDATE_SPECIFIC_TASK_FAILURE",

  FETCH_TASKS_REQUEST = "FETCH_ALL_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_ALL_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_ALL_TASKS_FAILURE",

  CREATE_TASK_REQUEST = "CREATE_NEW_TASK_REQUEST",
  CREATE_TASK_SUCCESS = "CREATE_NEW_TASK_SUCCESS",
  CREATE_TASK_FAILURE = "CREATE_NEW_TASK_FAILURE",

  DELETE_TASKS_REQUEST = "DELETE_SPECIFIC_TASKS_REQUEST",
  DELETE_TASKS_SUCCESS = "DELETE_SPECIFIC_TASKS_SUCCESS",
  DELETE_TASKS_FAILURE = "DELETE_SPECIFIC_TASKS_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}

export type TaskDetailsType = {
  id: number;
  title: string;
  assignedUserName?: string;
  description: string;
  dueDate: string;
  state: AvailableColumnsType;
  assignee?: number;
};

export type AvailableColumnsType = "in_progress" | "done" | "pending";

export type ColumnDataType = {
  title: string;
  taskIDs: string[];
  id: string;
};

export type ProjectDataType = {
  tasks: TasksType;
  columns: ColumnsType;
  columnOrder: AvailableColumnsType[];
};

export type TasksDispatch = React.Dispatch<TaskActions>;

export type TaskActions =
  | { type: TaskListAvailableAction.FETCH_TASKS_REQUEST }
  | {
      type: TaskListAvailableAction.FETCH_TASKS_SUCCESS;
      payload: ProjectDataType;
    }
  | { type: TaskListAvailableAction.FETCH_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.DELETE_TASKS_REQUEST }
  | { type: TaskListAvailableAction.DELETE_TASKS_SUCCESS }
  | { type: TaskListAvailableAction.DELETE_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string }
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ProjectDataType }
  | { type: TaskListAvailableAction.UPDATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.UPDATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.UPDATE_TASK_FAILURE; payload: string };
