import { GET_UPCOMINGCLASS, GET_CLASSES, CREATE_CLASS } from "../actions/types";
import dayjs from "dayjs";

const INITIAL_STATE = {
  Class: [],
  classes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UPCOMINGCLASS:
      return {
        ...state.Class,
        Class: action.classes.data
          .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
          .find(
            (Class) => Class.status && dayjs(Class.date) > dayjs(new Date())
          ),
      };
    case GET_CLASSES:
      return {
        ...state.classes,
        classes: action.classes,
      };
    case CREATE_CLASS:
      return {
        ...state.classes,
        classes: action.classes,
      };
    default:
      return state;
  }
};
