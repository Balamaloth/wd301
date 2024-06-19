import { CommentsState, CommentsActions } from "./types";
import { reducer, initialState } from "./reducer";
import React, { createContext, useContext, useReducer } from "react";

type CommentsDispatchType = React.Dispatch<CommentsActions>;
const CommentsStateContext = createContext<CommentsState>(initialState);
const CommentsDispatchContext = createContext<CommentsDispatchType>(() => {});

export const useCommentsState = () => useContext(CommentsStateContext);
export const useCommentsDispatch = () => useContext(CommentsDispatchContext);

export const CommentsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider value={dispatch}>
        {children}
      </CommentsDispatchContext.Provider>
    </CommentsStateContext.Provider>
  );
};
