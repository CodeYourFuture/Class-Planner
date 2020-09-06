import {
  CREATE_BOOKING,
  GET_BOOKING_BY_CLASSID,
  ACTION_STARTED,
  ACTION_SUCCESS,
  ACTION_ERROR,
} from "./types";
import axios from "axios";
export const createBooking = (newBookingData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: CREATE_BOOKING,
      });
      const newBooking = await axios.post(`/api/v1/bookings`, {
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
        payload: error.response.data,
        actionType: CREATE_BOOKING,
      });
    }
  };
};

export const Get_BookingByClassId = (classId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_STARTED,
        actionType: GET_BOOKING_BY_CLASSID,
      });
      const bookings = await axios.get(`/api/v1/class/bookings/${classId}`);
      dispatch({
        type: GET_BOOKING_BY_CLASSID,
        bookings: bookings.data,
      });
      dispatch({
        type: ACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ACTION_ERROR,
        error: "Error: Something went wrong, please try again later.",
        actionType: GET_BOOKING_BY_CLASSID,
      });
    }
  };
};
