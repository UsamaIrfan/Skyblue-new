export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const FETCH_SLIDER = 'FETCH_SLIDER'
export const RECENT_PRODUCTS = "RECENT_PRODUCTS";

const Api = 'http://skybluewholesale.com:80/'



// demo Login starts here
export const fetchCategoriesFunc = () => {
    return async (dispatch, getState) => {
        const id = getState().Auth.Login.customerId
        // console.log(id)

      const response = await fetch(`http://skybluewholesale.com:80/api/CatalogApi/Categories?customerId=107001&pageIndex=0&pageSize=25`, {
        method: "POST",
        
      });
  
      const resData = await response.json();
      console.log('My Content is')
      // console.log(resData);
      // console.log(resData.success);
  
      if (resData.success === false) {
        throw new Error(resData.message);
      }
  
      dispatch({
        type: FETCH_CATEGORIES,
        Products: resData.obj,
  
      });
    //   saveDataToStorage(token, resData);
    };
  };


// demo Login starts here
export const fetchProductFunc = (catId) => {
  return async (dispatch, getState) => {
      const id = getState().Auth.Login.customerId
      console.log(id)

    const response = await fetch(`${Api}api/CatalogApi/Products?customerId=${id}&categoryId=${catId}`, {
      method: "POST",
      
    });

    const resData = await response.json();

    // console.log(resData);
    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_PRODUCT,
      catProduct: resData.obj,

    });
  //   saveDataToStorage(token, resData);
  };
};



// demo Login starts here
export const fetchSliderImages = () => {
  return async (dispatch, getState) => {
     
    const response = await fetch(`${Api}api/CatalogApi/GetSliderImages`, {
      method: "GET",
      
    });

    const resData = await response.json();
    // console.log(resData);
    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_SLIDER,
      slider: resData.obj,

    });
  //   saveDataToStorage(token, resData);
  };
};

// Recent Products
export const getRecentProducts = () => {
  return async (dispatch, getState) => {
  const id = getState().Auth.Login.customerId
  
    console.log("CUSTOMER ID ========> ", id)

  const response = await fetch(`${Api}api/CatalogApi/RecentProducts?customerId=${id}`, {
    method: "POST",
    
  });

  const resData = await response.json();

  // console.log("PRODUCTS ==============>>>",resData);
  // console.log(resData.success);

  if (resData.success === false) {
    throw new Error(resData.message);
  }

  dispatch({
    type: RECENT_PRODUCTS,
    recentProducts: resData.obj,
  });
};
};