// import Address from "../../model/Address";
// import {
//   FETCH_PROFILE,
//   AGENT_REG,
//   LOGOUT,
//   AUTHENTICATE,
// } from "../../Redux/Actions/Auth";
import { ActionSheetIOS } from "react-native";
import {
  FETCH_CATEGORIES,
  FETCH_PRODUCT,
  FETCH_SLIDER,
  RECENT_PRODUCTS,
  SET_PRODUCT_EMPTY,
  ADD_PRODUCT,
  ADD_SUB_CATS,
  ADD_CATAGORIES,
} from "../Action/Products";

const initialState = {
  Products: [],
  catProducts: [],
  subCats: [],
  sliderImages: [],
  recentProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        Products: action.Products,
      };
      case ADD_SUB_CATS:
        return {
          ...state,
          subCats: action.subCats,
        }
        case ADD_CATAGORIES: 
        return {
          ...state,
          Products: state.Products.concat(action.Products)
        }
      case FETCH_PRODUCT:
        if (!state.catProducts) {
        return {
          ...state,
          catProducts: action.catProduct,
        };
      }
      case ADD_PRODUCT:
        return {
          ...state,
            catProducts: state.catProducts.concat(action.catProduct),
          };
      case SET_PRODUCT_EMPTY: 
      return {
      ...state,
        catProducts: [],
      };

    case FETCH_SLIDER:
      return {
        ...state,
        sliderImages: action.slider,
      };
        

    case RECENT_PRODUCTS:
      return {
        ...state,
        recentProducts: action.recentProducts,
      };

    // case AUTHENTICATE:
    //   return {
    //     ...state,
    //     Login: action.Login,
    //     token: action.token,
    //   };

    // case LOGOUT:
    //   return {
    //     ...state,
    //     Login: {},
    //     token: "",
    //   };

    // // case AGENT_REG:
    // //   return {
    // //     ...state,
    // //     agentId: action.agentId,
    // //   };
  }
  return state;
};
