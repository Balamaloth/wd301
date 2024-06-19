export type User = {
  id: number;
  email: string;
  name: string;
};

export type Comment = {
  id: number;
  description: string;
  createdAt: string;
  owner: number;
  user: User;
  task_id: number;
};

export type CommentsPayload = Omit<
  Comment,
  "id" | "createdAt" | "user" | "task_id"
>;

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type CommentsActions =
  | { type: "FETCH_ALL_COMMENTS_REQUEST" }
  | { type: "FETCH_ALL_COMMENTS_SUCCESS"; payload: Comment[] }
  | { type: "FETCH_ALL_COMMENTS_FAILURE"; payload: string }
  | { type: "ADD_COMMENT_SUCCESS"; payload: Comment };
