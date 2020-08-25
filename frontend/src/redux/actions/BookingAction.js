import {
  CREATE_BOOKING,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";
import httpClient from "../../common/httpClient/httpClient.js";

export const createBooking = (newBookingData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: CREATE_BOOKING,
      });
      const newBooking = await httpClient.post(`/api/v1/bookings`, {
        ...newBookingData,
      });
      dispatch({
        type: CREATE_BOOKING,
        booking: newBooking.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        error: "Error: Something went wrong, please try again later.",
        actionType: CREATE_BOOKING,
      });
    }
  };
};
