import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT,
  GET_NEWFAMILYS,
} from "../_actions/types";

function userReducer(state = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default userReducer;
