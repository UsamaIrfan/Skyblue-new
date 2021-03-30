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
        throw new Error("Something Went Wrong While Getting Categories 1.");
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
        dispatch({
          type: ADD_CATAGORIES,
          Products: response.data.obj,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Something Went Wrong While Getting Add Categories.");
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
        throw new Error("Something Went Wrong While RecursiveParentChildCategories.");
      });
  };
};


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
        dispatch({
          type: FETCH_PRODUCT,
          catProduct: response.data.obj,
        });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Getting Product Listing (Actions).");
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
        dispatch({
          type: FETCH_PRODUCT,
          catProduct: response.data.obj,
        });
      })
      .catch((error) => {
        throw new Error("Something Went Wrong While Adding Product Listing.");
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

export const fetchSliderImages = () => {
  return async (dispatch, getState) => {
    await axios
      .get(`${Api}api/CatalogApi/GetSliderImages`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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

export const getRecentProducts = () => {
  return async (dispatch, getState) => {
    postData = {};
    const id = getState().Auth.Login.customerId;
    await axios
      .post(`${Api}api/CatalogApi/RecentProducts?customerId=${id}`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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
