import {
  Projectreducer,
  initialState,
  ProjectsStateType,
  ProjectsActions,
} from "./reducer";

import React, { useContext, useReducer, createContext } from "react";

const ProjectsStateContext = createContext<ProjectsStateType | undefined>(
  undefined,
);
type ProjectsDispatchType = React.Dispatch<ProjectsActions>;
const ProjectsDispatchContext = createContext<ProjectsDispatchType | undefined>(
  undefined,
);

export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(Projectreducer, initialState);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

export const useProjectsState = () => useContext(ProjectsStateContext);

export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);
