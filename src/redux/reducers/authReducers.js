import { LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      localStorage.removeItem("accessToken");
      localStorage.removeItem('currentPage');
      break;
    default:
      return state;
  }
}
