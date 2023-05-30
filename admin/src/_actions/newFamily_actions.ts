import axios from "axios";
import {
  GET_NEW_FAMILY,
  COMBINE_NEW_FAMILYS,
  DELETE_NEW_FAMILYS,
} from "./types";

export const getNewFamily = async (body) => {
  try {
    const axiosRequest = await axios.post("/api/admin/new-family", body);
    const { data } = axiosRequest;
    return {
      type: GET_NEW_FAMILY,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_NEW_FAMILY,
      payload: {
        success: false,
      },
    };
  }
};

export const combineNewFamily = async (body) => {
  return {
    type: COMBINE_NEW_FAMILYS,
    payload: body,
  };
};

export const deleteNewFamily = async (body) => {
  try {
    const axiosRequest = await axios.post("/api/admin/new-family/delete", body);
    const { data } = axiosRequest;
    return {
      type: DELETE_NEW_FAMILYS,
      payload: data,
    };
  } catch (err) {
    return {
      type: DELETE_NEW_FAMILYS,
      payload: {
        success: false,
      },
    };
  }
};
