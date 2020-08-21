import { GET_CLASSES } from "../actions/Types.js";

const INITIAL_STATE = {
  classes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.classes,
      };
    default:
      return state;
  }
};
