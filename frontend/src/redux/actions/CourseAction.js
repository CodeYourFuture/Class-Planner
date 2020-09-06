import {
  GET_COURSES,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";
import axios from "axios";

export const Get_Courses = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: GET_COURSES,
      });
      const courses = await axios.get(`/api/v1/courses/`);

      dispatch({
        type: GET_COURSES,
        courses: courses.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        payload:
          typeof error.response !== "undefined" ? error.response.data : null,
        actionType: GET_COURSES,
      });
    }
  };
};
