import {
  FETCH_CART_DATA,
  DELETE_CART_PRODUCT,
  FETCH_ORDER,
  FETCH_CART_COUNT
} from "../Action/Cart";


const initialState = {
  cart: [],
  order: {},
  cartCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_DATA:
      return {
        ...state,
        cart: action.CartProducts
      };
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.cId)
      };
      case FETCH_ORDER:
        return{
          ...state,
          order: action.Order
        }
        case FETCH_CART_COUNT:
          return {
            ...state,
            cartCount:action.Count
          }

  }
  return state;
};
