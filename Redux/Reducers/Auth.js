// import Address from "../../model/Address";
// import {
//   FETCH_PROFILE,
//   AGENT_REG,
//   LOGOUT,
//   AUTHENTICATE,
// } from "../../Redux/Actions/Auth";
import { LOGIN, USER_INFO,AUTHENTICATE,LOGOUT, COUNTRIES,FETCH_STATE } from "../Action/Auth";

const initialState = {
  auth: [],
  Login: {},
  Info:{},
  Countries:[],
  StatesProvince: [],

};

export default (state = initialState, action) => {
  switch (action.type) {


    case LOGIN:
      return {
        ...state,
        Login: action.Login,

      };

      case USER_INFO:
        return{
          ...state,
          Info:  action.Info
        }

        case AUTHENTICATE:
          return {
            ...state,
            Login: action.Login,
          };

    // case AUTHENTICATE:
    //   return {
    //     ...state,
    //     Login: action.Login,
    //     token: action.token,
    //   };

    case LOGOUT:
      return {
        ...state,
        Login: {},
      };

      case COUNTRIES:
        return {
          ...state,
          Countries: action.country
        }

        case FETCH_STATE:
          return {
            ...state,
            StatesProvince: action.StatesProvince,
          };

    // // case AGENT_REG:
    // //   return {
    // //     ...state,
    // //     agentId: action.agentId,
    // //   };
  }
  return state;
};
