import {
  GET_NEW_FAMILY,
  COMBINE_NEW_FAMILYS,
  DELETE_NEW_FAMILYS,
} from "_actions/types";

const newFamilyReducer = (state = { allNewFamily: [] }, action: any) => {
  switch (action.type) {
    case GET_NEW_FAMILY:
      return { ...state, newFamily: action.payload };
    case DELETE_NEW_FAMILYS:
      if (action.payload.success) {
        const copyAllNewFamily = [...state.allNewFamily];
        const fillterNewfamily = copyAllNewFamily.filter((item) => {
          return item._id !== action.payload.newfamily._id;
        });
        state.allNewFamily = fillterNewfamily;
      }
      return { ...state };
    case COMBINE_NEW_FAMILYS:
      const copyAllNewFamily = [...state.allNewFamily, ...action.payload];
      state.allNewFamily = copyAllNewFamily;
      return { ...state };
    default:
      return state;
  }
};

export default newFamilyReducer;
