import {
  GET_UPCOMINGCLASS,
  GET_CLASSES,
  CREATE_CLASS,
  SET_CURRENTCLASS,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";
import httpClient from "../../common/httpClient/httpClient.js";

export const Get_UpcomingClass = (city) => {
  return async (dispatch) => {
    try {
      const courses = await httpClient.get(`/api/v1/courses/`);
      const filtredCourses = courses.data.data.filter(
        (course) => course.cityName === city
      ).map(course=> course._id);
      const classes = await httpClient.get(`/api/v1/classes`);
      dispatch({
        type: ACTION_STARTED,
        actionType: GET_UPCOMINGCLASS,
      });
      dispatch({
        type: GET_UPCOMINGCLASS,
        filtredCourses: filtredCourses,
        classes: classes.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        payload: typeof error.response !== "undefined" ? error.response.data : "Error",
        actionType: GET_UPCOMINGCLASS,
      });
    }
  };
};

export const Get_Classes = () => {
  return async (dispatch) => {
    try {
      const classes = await httpClient.get(`/api/v1/classes`);
      dispatch({
        type: ACTION_STARTED,
        actionType: GET_CLASSES,
      });
      dispatch({
        type: GET_CLASSES,
        classes: classes.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        payload: typeof error.response !== "undefined" ? error.response.data : "Error",
        actionType: GET_CLASSES,
      });
    }
  };
};

export const createClass = (newClassData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: CREATE_CLASS,
      });
      const newClass = await httpClient.post(`/api/v1/classes`, {
        ...newClassData,
      });
      dispatch({
        type: CREATE_CLASS,
        classes: newClass.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        payload: typeof error.response !== "undefined" ? error.response.data : "Error",
        actionType: CREATE_CLASS,
      });
    }
  };
};
export const set_CurrentClass = (Class) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: SET_CURRENTCLASS,
      });
      dispatch({
        type: SET_CURRENTCLASS,
        currentClass: Class,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        payload: typeof error.response !== "undefined" ? error.response.data : "Error",
        actionType: SET_CURRENTCLASS,
      });
    }
  };
};
