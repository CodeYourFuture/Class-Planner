import {
  GET_CLASSES,
  CREATE_CLASS,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";
import httpClient from "../../common/httpClient";

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
        error: "Error: Something went wrong, please try again later.",
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
        error: "Error: Something went wrong, please try again later.",
        actionType: CREATE_CLASS,
      });
    }
  };
};
