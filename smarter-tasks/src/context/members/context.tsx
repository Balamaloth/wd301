import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, MembersState, MembersActions } from "./reducer";

const MembersStateContext = createContext<MembersState | undefined>(undefined);
type MembersDispatch = React.Dispatch<MembersActions>;
const MembersDispatchContext = createContext<MembersDispatch | undefined>(
  undefined,
);

export const useMembersState = () => useContext(MembersStateContext);
export const useMembersDispatch = () => useContext(MembersDispatchContext);

export const MembersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersStateContext.Provider value={state}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersStateContext.Provider>
  );
};
