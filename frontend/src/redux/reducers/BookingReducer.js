import { CREATE_BOOKING } from "../actions/types";

const INITIAL_STATE = {
  bookings: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return {
        ...state.Booking,
        booking: action.booking.data,
      };
    default:
      return state;
  }
};
