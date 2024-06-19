import { API_ENDPOINT } from "../../config/constants";

export const deleteMember = async (dispatch: any, mid: number) => {
  try {
    const Secrettoken = localStorage.getItem("authToken") ?? "";
    const res = await fetch(`${API_ENDPOINT}/users/${mid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Secrettoken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Unable to delete member");
    }
    const data = await res.json();
    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message };
    }
    console.log(data);
    dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: mid });
    return { ok: true };
  } catch (error) {
    console.error("Unable to delete member", error);
    return { ok: false, error };
  }
};

export const addMember = async (dispatch: any, args: any) => {
  try {
    const Secrettoken = localStorage.getItem("authToken") ?? "";
    const res = await fetch(`${API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Secrettoken}`,
      },
      body: JSON.stringify(args),
    });
    if (!res.ok) {
      throw new Error("Error while adding member !!!!");
    }
    const resdata = await res.json();
    if (resdata.errors && resdata.errors.length > 0) {
      return { ok: false, error: resdata.errors[0].message };
    }
    console.log(resdata);
    dispatch({ type: "ADD_MEMBER_SUCCESS", payload: resdata.user });
    return { ok: true };
  } catch (error) {
    console.error("Error while adding member!!! ", error);
    return { ok: false, error };
  }
};

export const fetchMembers = async (dispatch: any) => {
  const Secrettoken = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ALL_MEMBERS_REQUEST" });
    const res = await fetch(`${API_ENDPOINT}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Secrettoken}`,
      },
    });
    const resdata = await res.json();
    console.log(resdata);
    dispatch({ type: "FETCH_ALL_MEMBERS_SUCCESS", payload: resdata });
  } catch (error) {
    console.log("ERROR WHILE GETTING MEMBERS", error);
    dispatch({
      type: "FETCH_ALL_MEMBERS_FAILURE",
      payload: "Error while getting members",
    });
  }
};
