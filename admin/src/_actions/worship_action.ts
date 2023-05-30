import axios from "axios";
import {
  ADD_WORSHIP,
  SPEAKER_IMAGE_SAVE,
  GET_WORSHIP,
  EDIT_WORSHIP,
} from "./types";
import { Routes } from "constants/routeItems";

const {
  addWorshipManagement,
  speakerImageSave,
  getWorshipManagement,
  editWorshipManagement,
} = Routes;

export const getWorship = async () => {
  try {
    const axiosRequest = await axios.get(getWorshipManagement);
    const { data } = axiosRequest;
    return {
      type: GET_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};

export const addWorship = async (body) => {
  try {
    const axiosRequest = await axios.post(addWorshipManagement, body);
    const { data } = axiosRequest;
    return {
      type: ADD_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: ADD_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};
export const editWorship = async (body) => {
  try {
    const axiosRequest = await axios.post(editWorshipManagement, body);
    const { data } = axiosRequest;
    return {
      type: EDIT_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: EDIT_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};

export const imageSave = async (formData, config) => {
  try {
    const axiosRequest = await axios.post(speakerImageSave, formData, config);
    const { data } = axiosRequest;
    return {
      payload: data,
    };
  } catch (err) {
    return {
      type: SPEAKER_IMAGE_SAVE,
      payload: {
        success: false,
      },
    };
  }
};
