import { GET_COURSES } from "../actions/types";

const INITIAL_STATE = {
  courses: [],
  course: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state.courses,
        courses: action.courses.data,
      };
    default:
      return state;
  }
};
