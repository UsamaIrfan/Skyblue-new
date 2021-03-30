export const ADD_TO_CART = "ADD_TO_CART";
export const FETCH_CART_DATA = "FETCH_CART_DATA";
export const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";
export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_CART_COUNT = "FETCH_CART_COUNT";
import axios from "axios";
import Cart from "../../models/cart";

const Api = "http://skybluewholesale.com:80/";

export const fetchCartData = () => {

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`${Api}api/CatalogApi/Cart?customerId=${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({
          type: FETCH_CART_DATA,
          CartProducts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Product Doesnot Fetch");
      });
  };
};

export const addToCart = (
  id,
  title,
  imageUrl,
  price,
  discountPrice,
  quantity,
) => {
  var postData = {
    id: id,
    title: title,
    imageUrl: imageUrl,
    price: price,
    discountPrice: discountPrice,
    quantity: quantity,
  };

  return async (dispatch) => {
    await axios
      .post(`https://flower-327fe.firebaseio.com/cart/1C9JhZJcqKO3Q0wh4pqJ93OqRE02.json`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {

      })
      .catch((error) => {
          throw new Error("Product Cant be Updated Server Busy");
      });
  };
};

export const addToCartUpdate = (
  cId,
  id,
  title,
  imageUrl,
  price,
  discountPrice,
  quantity
) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://flower-327fe.firebaseio.com/cart/1C9JhZJcqKO3Q0wh4pqJ93OqRE02/${cId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          imageUrl,
          price,
          discountPrice,
          quantity,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Product Cant be Added Server Busy");
    }
  };
};

export const deleteCart = (cartId) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`http://skybluewholesale.com:80/api/CatalogApi/RemoveItemFromCart?customerId=${id}&shoppingCartId=${cartId}`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {

      })
      .catch((error) => {
          throw new Error("Product Cant be Deleted Server Busy");
      });
  };
};

export const fetchOrder = () => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`http://skybluewholesale.com:80/api/CatalogApi/CustomerOrder?customerId=${id}`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({
          type: FETCH_ORDER,
          Order: response.data.Orders,
        });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Getting Orders.");
      });
  };
};

export const fetchCountCart = () => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`http://skybluewholesale.com:80/api/CatalogApi/CartCount?customerId=${id}`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({
          type: FETCH_CART_COUNT,
          Count: response.data.Count,
        });
      })
      .catch((error) => {
        throw error;
        throw new Error("Something Went Wrong While Getting cart Count.");
      });
  };
};
