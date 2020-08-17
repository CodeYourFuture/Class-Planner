import {
  GET_CLASSES,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./Types";
import httpClient from "../../Common/httpClient";

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