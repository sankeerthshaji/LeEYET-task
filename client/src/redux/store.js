import { legacy_createStore as createStore } from "redux";

const initialState = {
  user: null,
  admin: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
