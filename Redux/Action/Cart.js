export const ADD_TO_CART = "ADD_TO_CART";
export const FETCH_CART_DATA = "FETCH_CART_DATA";
export const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";
export const FETCH_ORDER = "FETCH_ORDER";
export const FETCH_CART_COUNT = "FETCH_CART_COUNT";

import Cart from '../../models/cart'


export const fetchCartData = () => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId
  
    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/Cart?customerId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
  
          },
 
        }
      );

      if (!response.ok) {
        throw new Error("Product Doesnot Fetch");
      }

      const resData = await response.json();
      // console.log(resData)

      // const LoadProducts = [];

      // for (let key in resData) {
      //   LoadProducts.push(
      //     new Cart(
      //       key,
      //       resData[key].id,
      //       resData[key].title,
      //       resData[key].imageUrl,
      //       resData[key].price,
      //       resData[key].discountPrice,

      //       resData[key].quantity
      //     )
      //   );
      // }

      // console.log(LoadProducts);

      dispatch({
        type: FETCH_CART_DATA,
        CartProducts: resData
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const addToCart = (
  id,
  title,
  imageUrl,
  price,
  discountPrice,
  quantity
) => {
  return async (dispatch, getState) => {
    
    const response = await fetch(
      `https://flower-327fe.firebaseio.com/cart/1C9JhZJcqKO3Q0wh4pqJ93OqRE02.json`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id,
          title,
          imageUrl,
          price,
          discountPrice,
          quantity
        })
      }
    );

    if (!response.ok) {
      throw new Error("Product Cant be Updated Server Busy");
    }
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
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id,
          title,
          imageUrl,
          price,
          discountPrice,
          quantity
        })
      }
    );

    if (!response.ok) {
      throw new Error("Product Cant be Updated Server Busy");
    }
  };
};

export const deleteCart = cartId => {
  return async (dispatch, getState) => {

    const id = getState().Auth.Login.customerId
    const response = await fetch(
      `http://skybluewholesale.com:80/api/CatalogApi/RemoveItemFromCart?customerId=${id}&shoppingCartId=${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",

        },
      }
    );
    const resData = await response.json();
    // console.log(resData)

    // dispatch({ type: DELETE_CART_PRODUCT, cId: cId });
  };
};

// export const addToOrder = (
//   deliveryAddress,
//   deliveryDate,
//   deliveryTime,
//   giftMessage,
//   extraInformation,
//   cartProducts,
//   paymentMethod,
//   totalAmount
// ) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const userId = getState().auth.userId;
//     const date = new Date();
//     try {
//       const response = await fetch(
//         `https://flower-327fe.firebaseio.com/order/${userId}.json?auth=${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json"
//           },
//           body: JSON.stringify({
//             deliveryAddress,
//             deliveryDate,
//             deliveryTime,
//             giftMessage,
//             extraInformation,
//             cartProducts,
//             paymentMethod,
//             totalAmount,
//             orderDate: date.toISOString()
//           })
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Something Went Wrong");
//       }
//       const resData = await response.json();

//       const response1 = await fetch(
//         `https://flower-327fe.firebaseio.com/cart/${userId}.json?auth=${token}`,
//         {
//           method: "DELETE"
//         }
//       );

//       dispatch({
//         type: ADD_ORDER,

//         orderDetails: {
//           id: resData.name,
//           deliveryAddress,
//           deliveryDate,
//           deliveryTime,
//           giftMessage,
//           extraInformation,
//           cartProducts,
//           paymentMethod,
//           totalAmount,
//           orderDate: date
//         }
//       });
//     } catch (err) {
//       console.log(err.message);
//       throw err;
//     }
//   };
// };

export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId
    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/CustomerOrder?customerId=${id}`,
       { method:'POST'}
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const resData = await response.json();
      // console.log(resData)

     
      dispatch({
        type: FETCH_ORDER,
        Order: resData.Orders
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};


export const fetchCountCart = () => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId
    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/CartCount?customerId=${id}`,
       { method:'POST'}
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const resData = await response.json();
      // console.log(resData)

     
      dispatch({
        type: FETCH_CART_COUNT,
        Count: resData.Count
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};
