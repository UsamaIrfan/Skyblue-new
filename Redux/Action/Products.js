export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_SLIDER = "FETCH_SLIDER";
export const RECENT_PRODUCTS = "RECENT_PRODUCTS";
import axios from "axios";

const Api = "http://skybluewholesale.com:80/";

export const fetchCategoriesFunc = () => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/Categories?customerId=107001&pageIndex=0&pageSize=25`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORIES,
          Products: response.data.obj,
        });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };
};

// demo Login starts here
// export const fetchProductFunc = (catId) => {
//   return async (dispatch, getState) => {
//     const id = getState().Auth.Login.customerId;
//     console.log(id);

//     const response = await fetch(
//       `${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}`,
//       {
//         method: "POST",
//       }
//     );

//     const resData = await response.json();

//     // console.log(resData);
//     // console.log(resData.success);

//     if (resData.success === false) {
//       throw new Error(resData.message);
//     }

//     dispatch({
//       type: FETCH_PRODUCT,
//       catProduct: resData.obj,
//     });
//     //   saveDataToStorage(token, resData);
//   };
// };

export const fetchProductFunc = (catId) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // console.log("RESPONSE ========>", response);
        dispatch({
          type: FETCH_PRODUCT,
          catProduct: response.data.obj,
        });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };
};


// demo Login starts here
// export const fetchSliderImages = () => {
//   return async (dispatch, getState) => {
//     const response = await fetch(`${Api}api/CatalogApi/GetSliderImages`, {
//       method: "GET",
//     });

//     const resData = await response.json();
//     // console.log(resData);
//     // console.log(resData.success);

//     if (resData.success === false) {
//       throw new Error(resData.message);
//     }

//     dispatch({
//       type: FETCH_SLIDER,
//       slider: resData.obj,
//     });
//     //   saveDataToStorage(token, resData);
//   };
// };

export const fetchSliderImages = () => {
  return async (dispatch, getState) => {
    await axios
      .get(
        `${Api}api/CatalogApi/GetSliderImages`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // console.log(response.data);
    dispatch({
      type: FETCH_SLIDER,
      slider: response.data.obj,
    });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

// Recent Products
// export const getRecentProducts = () => {
//   return async (dispatch, getState) => {
//     const id = getState().Auth.Login.customerId;

//     console.log("CUSTOMER ID ========> ", id);

//     const response = await fetch(
//       `${Api}api/CatalogApi/RecentProducts?customerId=${id}`,
//       {
//         method: "POST",
//       }
//     );

//     const resData = await response.json();

//     // console.log("PRODUCTS ==============>>>",resData);
//     // console.log(resData.success);

//     if (resData.success === false) {
//       throw new Error(resData.message);
//     }

//     dispatch({
//       type: RECENT_PRODUCTS,
//       recentProducts: resData.obj,
//     });
//   };
// };

export const getRecentProducts = () => {
  return async (dispatch, getState) => {
    postData = {}
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `${Api}api/CatalogApi/RecentProducts?customerId=${id}`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // console.log(response.data);
    dispatch({
      type: RECENT_PRODUCTS,
      recentProducts: response.data.obj,
    });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Getting Recent Products.");
      });
  };
};