import {
  SET_USER,
  CLEAR_USER,
} from '../constants/userConstants';
import {
  LOGIN_SUCCESS,
  LOGOUT,
} from '../constants/authConstants';

const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SET_USER:
      return {
        ...state,
        userInfo: action.payload.user,
      };
      
    case LOGOUT:
    case CLEAR_USER:
      return {
        ...state,
        userInfo: null,
      };
      
    default:
      return state;
  }
};

export default userReducer;