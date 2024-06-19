import { API_ENDPOINT } from "../../config/constants";
import {
  TaskDetailsPayloadType,
  TaskListAvailableAction,
  TasksDispatch,
  ProjectDataType,
} from "./types";

import { TaskDetailsType } from "./types";

export const refreshTasks = async (dispatch: any, pid: string) => {
  const secretToken = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.FETCH_TASKS_REQUEST });
    const res = await fetch(`${API_ENDPOINT}/projects/${pid}/tasks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error While Fetching Tasks");
    }
    const resdata = await res.json();
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_SUCCESS,
      payload: resdata,
    });
    console.dir(resdata);
  } catch (error) {
    console.error("Error Occured", error);
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_FAILURE,
      payload: "Error While Fetching Tasks",
    });
  }
};

export const reorderTasks = (
  NewState: ProjectDataType,
  dispatch: TasksDispatch,
) => {
  dispatch({ type: TaskListAvailableAction.REORDER_TASKS, payload: NewState });
};

export const updateTask = async (
  pid: string,
  task: TaskDetailsType,
  dispatch: TasksDispatch,
) => {
  const secretToken = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_REQUEST });
    const res = await fetch(
      `${API_ENDPOINT}/projects/${pid}/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify(task),
      },
    );

    if (!res.ok) {
      throw new Error("Error While Updating Task");
    }

    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_SUCCESS });
    refreshTasks(dispatch, pid);
  } catch (err) {
    console.error("Error while updating Task", err);

    dispatch({
      type: TaskListAvailableAction.UPDATE_TASK_FAILURE,
      payload: "Error while updating Task",
    });
  }
};

export const deleteTask = async (
  pid: string,
  task: TaskDetailsType,
  dispatch: TasksDispatch,
) => {
  const secretToken = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.DELETE_TASKS_REQUEST });
    const res = await fetch(
      `${API_ENDPOINT}/projects/${pid}/tasks/${task.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify(task),
      },
    );

    if (!res.ok) {
      throw new Error("Error While Deleting Task");
    }
    dispatch({ type: TaskListAvailableAction.DELETE_TASKS_SUCCESS });
    refreshTasks(dispatch, pid);
  } catch (err) {
    console.error("Error While Deleting Task", err);
    dispatch({
      type: TaskListAvailableAction.DELETE_TASKS_FAILURE,
      payload: "Error While Deleting Task",
    });
  }
};

export const addTask = async (
  pid: string,
  task: TaskDetailsPayloadType,
  dispatch: TasksDispatch,
) => {
  const secretToken = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.CREATE_TASK_REQUEST });

    const res = await fetch(`${API_ENDPOINT}/projects/${pid}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretToken}`,
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error("Error While Creating Task");
    }

    dispatch({ type: TaskListAvailableAction.CREATE_TASK_SUCCESS });
    refreshTasks(dispatch, pid);
  } catch (error) {
    console.error("Creating Task UnSuccessful", error);

    dispatch({
      type: TaskListAvailableAction.CREATE_TASK_FAILURE,
      payload: "Erro While Creating Task",
    });
  }
};
