interface ProjectType {
  id: number;
  name: string;
}

export const initialState: ProjectsStateType = {
  projects: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface ProjectsStateType {
  projects: ProjectType[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface ProjectsStateType {
  projects: ProjectType[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type ProjectsActions =
  | { type: "FETCH_ALL_PROJECTS_REQUEST" }
  | { type: "FETCH_ALL_PROJECTS_FAILURE"; payload: string }
  | { type: "ADD_PROJECT_SUCCESS"; payload: ProjectType }
  | { type: "FETCH_ALL_PROJECTS_SUCCESS"; payload: ProjectType[] };

export const Projectreducer = (
  state: ProjectsStateType = initialState,
  action: ProjectsActions,
): ProjectsStateType => {
  switch (action.type) {
    case "FETCH_ALL_PROJECTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ALL_PROJECTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_ALL_PROJECTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };
    case "ADD_PROJECT_SUCCESS":
      return { ...state, projects: [...state.projects, action.payload] };
    default:
      return state;
  }
};
