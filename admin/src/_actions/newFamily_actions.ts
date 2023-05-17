import axios from "axios";
import { GET_NEW_FAMILY } from "./types";

export const getNewFamily = async (body, arr) => {
  try {
    const axiosRequest = await axios.post("/api/admin/new-family", body);
    const { data } = axiosRequest;
    const addArr = () => {
      for (let item of data.newFamily) {
        arr.push(item);
      }
      data.newFamily = [...arr];
    };

    if (arr?.length !== data?.newFamily?.length) {
      addArr();
    } else {
      if (arr[0]._id !== data.newFamily[0]._id) {
        addArr();
      }
    }

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
