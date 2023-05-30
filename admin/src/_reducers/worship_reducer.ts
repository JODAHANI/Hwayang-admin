import { GET_WORSHIP, EDIT_WORSHIP, ADD_WORSHIP } from "_actions/types";

function worshipReducer(state = { allWorship: [] }, action: any) {
  switch (action.type) {
    case GET_WORSHIP:
      if (action.payload.success) {
        const copyAllWorship = [...action.payload.offLineWorship];
        state.allWorship = [...copyAllWorship];
      }
      return { ...state, worship: action.payload };
    case ADD_WORSHIP:
      const copyAllWorshipAdd = [...state.allWorship];
      copyAllWorshipAdd.unshift(action.payload.offLineWorship);
      state.allWorship = [...copyAllWorshipAdd];
      return { ...state };
    case EDIT_WORSHIP:
      const copyAllWorshipEdit = [...state.allWorship];
      const {
        payload: { offLineWorship },
      } = action;
      const index = copyAllWorshipEdit.findIndex((item) => {
        return item._id === offLineWorship._id;
      });
      copyAllWorshipEdit[index] = offLineWorship;
      state.allWorship = [...copyAllWorshipEdit];
      return { ...state };
    default:
      return state;
  }
}

export default worshipReducer;
