import { SIGNUP, LOGIN, LOGOUT } from "../action/authenticate";

const initialState = {
  token: null,
  userId: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userID,
      };
    case LOGIN:
      return {
        token: action.token,
        userId: action.userID,
      };

    case LOGOUT:
      return {
        token: null,
        userID: null,
      };

    default:
      return state;
  }
};

export default user;
