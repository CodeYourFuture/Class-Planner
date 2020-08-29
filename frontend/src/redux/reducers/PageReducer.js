import { SEND_PAGEDATA } from "../actions/types";

const INITIAL_STATE = {
  pageData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_PAGEDATA :
      return {
        ...state.pageData,
        pageData: action.pageData,
      };
    default:
      return state;
  }
};
