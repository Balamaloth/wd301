import { taskReducer, initialState } from "./reducer";
import { TaskListStateType, TasksDispatch } from "./types";
import React, { createContext, useContext, useReducer } from "react";

const TasksDispatchContext = createContext<TasksDispatch>(() => {});
const TasksStateContext = createContext<TaskListStateType>(initialState);

export const useTasksState = () => useContext(TasksStateContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);

export const TasksProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TasksStateContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};
