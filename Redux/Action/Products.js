export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_SLIDER = "FETCH_SLIDER";
export const RECENT_PRODUCTS = "RECENT_PRODUCTS";
export const SET_PRODUCT_EMPTY = "SET_PRODUCT_EMPTY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_SUB_CATS = "ADD_SUB_CATS";
export const ADD_CATAGORIES = "ADD_CATAGORIES";
import axios from "axios";

const Api = "http://skybluewholesale.com:80/";

export const fetchCategoriesFunc = (pageSize = 6) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/Categories?customerId=107001&pageIndex=0&pageSize=${pageSize}`,
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
        console.log(error);
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };
};

export const addCategoriesFunc = (pageIndex) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/Categories?customerId=107001&pageIndex=${pageIndex}&pageSize=6`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // console.log(response.data.obj);
        dispatch({
          type: ADD_CATAGORIES,
          Products: response.data.obj,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };
};

export const RecursiveParentChildCategories = (CatId) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/RecursiveParentChildCategories?parentCategoryId=${CatId}&customerId=107001`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({
          type: ADD_SUB_CATS,
          subCats: response.data.obj,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };
};

// demo Login starts here
// export const fetchProductFunc = (catId, pageIndex) => {
//   return async (dispatch, getState) => {
//     const id = getState().Auth.Login.customerId;
//     console.log(id);

//     const response = await fetch(
//       `${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}&pageIndex=${0 + pageIndex}&pageSize=8`,
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

export const fetchProductFunc = (catId, pageIndex) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .post(
        `${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}&pageIndex=${pageIndex}&pageSize=6`,
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

export const addProductFunc = (catId, pageIndex) => {
  var postData = {};

  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    const prevCats = getState().Product.catProduct;
    await axios
      .post(
        `${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}&pageIndex=${pageIndex}&pageSize=6`,
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

export const setProductEmpty = () => {
  return (dispatch) => {
    dispatch({
      type: SET_PRODUCT_EMPTY,
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
      .get(`${Api}api/CatalogApi/GetSliderImages`, {
        headers: { "Content-Type": "application/json" },
      })
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
    postData = {};
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`${Api}api/CatalogApi/RecentProducts?customerId=${id}`, postData, {
        headers: { "Content-Type": "application/json" },
      })
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
