import { API_ENDPOINT } from "../../config/constants";

export const addComment = async (
  dispatch: any,
  pid: string,
  tid: string,
  comment: string,
) => {
  try {
    const secretToken = localStorage.getItem("authToken") ?? "";
    const res = await fetch(
      `${API_ENDPOINT}/projects/${pid}/tasks/${tid}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },

        body: JSON.stringify({ description: comment }),
      },
    );
    if (!res.ok) {
      throw new Error("Unable to add comment");
    }
    const resdata = await res.json();
    if (resdata.errors && resdata.errors.length > 0) {
      return { ok: false, error: resdata.errors[0].message };
    }

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: resdata });

    getComments(dispatch, pid, tid);

    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getComments = async (dispatch: any, pid: string, tid: string) => {
  const secretToken = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ALL _COMMENTS_REQUEST" });
    const res = await fetch(
      `${API_ENDPOINT}/projects/${pid}/tasks/${tid}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
      },
    );
    let resdata = await res.json();
    resdata = resdata.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    dispatch({ type: "FETCH_ALL_COMMENTS_SUCCESS", payload: resdata });
  } catch (error) {
    console.log("Error while Getting Comments", error);
    dispatch({
      type: "FETCH_ALL_COMMENTS_FAILURE",
      payload: " Error while Getting Comments",
    });
  }
};
