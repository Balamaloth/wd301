import { CommentsActions } from "./types";
import { CommentsState } from "./types";

export const initialState: CommentsState = {
  isError: false,
  errorMessage: "",
  comments: [],
  isLoading: false,
};

export const reducer = (
  state: CommentsState = initialState,
  action: CommentsActions,
): CommentsState => {
  switch (action.type) {
    case "ADD_COMMENT_SUCCESS":
      return { ...state, comments: [...state.comments, action.payload] };
    case "FETCH_ALL_COMMENTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ALL_COMMENTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_ALL_COMMENTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    default:
      return state;
  }
};
