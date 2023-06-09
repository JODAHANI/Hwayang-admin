import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT,
  GET_LOGOS,
  UPDATE_LOGOS,
  GET_NEWFAMILYS,
} from "./types";
import { adminServer } from "constants/routeItems";

export const loginUser = async (dataTosubmit: object) => {
  let request = await axios.post(`${adminServer}/login`, dataTosubmit, {
    withCredentials: true,
  });
  const data = request.data;
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const register = async (dataTosubmit: object) => {
  let request = await axios.post(`${adminServer}/register`, dataTosubmit);
  const data = request.data;
  return {
    type: REGISTER_USER,
    payload: data,
  };
};
export const auth = async () => {
  const request = await axios.get(`${adminServer}/auth`, {
    withCredentials: true,
  });
  const data = request.data;
  return {
    type: AUTH_USER,
    payload: data,
  };
};

export const userLogout = async () => {
  const request = await axios.get(`${adminServer}/logout`);
  const data = request.data;
  return {
    type: LOGOUT,
    payload: data,
  };
};

export const getProclamation = async () => {
  try {
    const request = await axios.get(`${adminServer}/proclamation`);
    const data = request.data;
    return {
      type: GET_LOGOS,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_LOGOS,
      payload: { success: false },
    };
  }
};

export const updateProclamation = async (dataTosubmit) => {
  const request = await axios.post(
    `${adminServer}/proclamation-update`,
    dataTosubmit
  );
  const data = request.data;
  return {
    type: UPDATE_LOGOS,
    payload: data,
  };
};

export const notificationImageSave = async (dataTosubmit) => {
  const config: any = {
    header: { "content-type": "multipart/form-data" },
  };
  const request = await axios.post(
    `${adminServer}/notification/image-save`,
    dataTosubmit,
    config
  );

  const data = request.data;
  return data;
};

export const postNotification = async (dataTosubmit) => {
  const request = await axios.post(
    `${adminServer}/notification/upload-notification`,
    dataTosubmit
  );
  const data = request.data;
  return data;
};

export const getNotifications = async () => {
  const request = await axios.get(
    `${adminServer}/notification/get-notifications`
  );
  const data = request.data;
  return data;
};

export const getNewFamilys = async (body, newFamily) => {
  const request = await axios.post(`${adminServer}/new-family`, body);
  const data = request.data;
  if (body.loadMore) {
    const newFamilyNewArray = [...newFamily, ...data.newFamily];
    data.newFamily = newFamilyNewArray;
  }
  return {
    type: GET_NEWFAMILYS,
    payload: data,
  };
};
