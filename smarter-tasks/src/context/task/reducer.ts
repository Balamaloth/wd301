import projectData from "./initialData";
import { Reducer } from "react";

import {
  TaskListAvailableAction,
  TaskListStateType,
  TaskActions,
} from "./types";

export const initialState: TaskListStateType = {
  isError: false,
  errorMessage: "",
  projectData: projectData,
  isLoading: false,
};
export const taskReducer: Reducer<TaskListStateType, TaskActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TaskListAvailableAction.FETCH_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case TaskListAvailableAction.DELETE_TASKS_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.FETCH_TASKS_REQUEST:
      return { ...state, isLoading: true };
    case TaskListAvailableAction.FETCH_TASKS_SUCCESS:
      return { ...state, isLoading: false, projectData: action.payload };

    case TaskListAvailableAction.DELETE_TASKS_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.DELETE_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case TaskListAvailableAction.UPDATE_TASK_SUCCESS:
      return { ...state, isLoading: false };
    case TaskListAvailableAction.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case TaskListAvailableAction.UPDATE_TASK_REQUEST:
      return { ...state, isLoading: true };

    case TaskListAvailableAction.CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case TaskListAvailableAction.CREATE_TASK_REQUEST:
      return { ...state, isLoading: true };

    case TaskListAvailableAction.CREATE_TASK_SUCCESS:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
