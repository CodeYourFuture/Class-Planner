import { ACTION_ERROR } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_ERROR:
      return action.payload;
    default:
      return state;
  }
};
