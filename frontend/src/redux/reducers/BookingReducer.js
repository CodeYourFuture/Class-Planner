import { CREATE_BOOKING, GET_BOOKING_BY_CLASSID } from "../actions/types";

const INITIAL_STATE = {
  bookings: [],
  booking: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return {
        ...state.Booking,
        booking: action.booking.data,
      };
    case GET_BOOKING_BY_CLASSID:
      return {
        ...state.Bookings,
        bookings: action.bookings.data,
      };
    default:
      return state;
  }
};
