import { GET_NEW_FAMILY } from "_actions/types";

const newFamilyReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_NEW_FAMILY:
      return { ...state, newFamily: action.payload };
    default:
      return state;
  }
};

export default newFamilyReducer;
