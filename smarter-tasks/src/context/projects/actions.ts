import { API_ENDPOINT } from "../../config/constants";

export const addProject = async (dispatch: any, dataToPost: any) => {
  try {
    const Secrettoken = localStorage.getItem("authToken") ?? "";
    const res = await fetch(`${API_ENDPOINT}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Secrettoken}`,
      },
      body: JSON.stringify(dataToPost),
    });
    if (!res.ok) {
      throw new Error("Failed to create project");
    }
    const data = await res.json();
    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message };
    }
    dispatch({ type: "ADD_PROJECT_SUCCESS", payload: data });
    return { ok: true };
  } catch (err) {
    console.error("Cant add Project", err);

    return { ok: false, err };
  }
};

export const fetchProjects = async (dispatch: any) => {
  const secretToken = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ALL_PROJECTS_REQUEST" });
    const res = await fetch(`${API_ENDPOINT}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretToken}`,
      },
    });
    const resdata = await res.json();
    dispatch({ type: "FETCH_ALL_PROJECTS_SUCCESS", payload: resdata });
  } catch (err) {
    console.log("Unable To fetch Projects", err);
    dispatch({
      type: "FETCH_ALL_PROJECTS_FAILURE",
      payload: "Cannot fetch projects",
    });
  }
};
