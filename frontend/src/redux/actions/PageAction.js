import {
  SEND_PAGEDATA,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";

export const Send_PageData = (user, title, city) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: SEND_PAGEDATA,
      });
      dispatch({
        type: SEND_PAGEDATA,
        pageData: {
          user: user,
          title: title,
          city: city,
        },
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        error: "Error: Something went wrong, please try again later.",
        actionType: SEND_PAGEDATA,
      });
    }
  };
};
