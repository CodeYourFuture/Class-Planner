import { GET_CLASSES,CREATE_CLASS } from "../actions/types";

const INITIAL_STATE = {
  classes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.classes
      };
      case CREATE_CLASS:
      return {
        ...state,
        classes: action.classes
      };
    default:
      return state;
  }
};
