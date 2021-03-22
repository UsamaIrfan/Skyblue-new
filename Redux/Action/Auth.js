export const LOGIN = "LOGIN";
export const USER_INFO = "USER_INFO";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const COUNTRIES = "COUNTRIES";
export const FETCH_STATE = 'FETCH_STATE'
import { AsyncStorage } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
const Api = 'http://skybluewholesale.com:80/';


// demo Login starts here

export const LoginUser = (email, password, navigation) => {
    return async (dispatch) => {

      const response = await fetch(`http://skybluewholesale.com:80/api/AccountApi/Login?username=${email}&password=${password}`, {
        method: "GET",
        
      });
  
      const resData = await response.json();
      console.log(resData);
      // console.log(resData.success);
  
      if (resData.success === false) {
        throw new Error(resData.message);
      }
  
      dispatch({
        type: LOGIN,
        Login: resData,
  
      });
      navigation.navigate("Home")
      saveDataToStorage(resData);
    };
  };
  


//   AGENT REGISTRATION STARTS FORM HERE
export const registrationFunc = (
  FirstName,
  LastName,
  CompanyName,
  StreetAddress,
  StreetAddress2,
  PostalCode,
  City,
  Phone,
  Email,
  Password,
  ConfirmPassword,
  CountryId,
  StateId
  ) => {
    return async (dispatch, getState) => {
      // const userId = getState().auth.userId;
      // const token = getState().auth.token;
      // console.log(userId);
      // console.log(token)

  
      try {
        const response = await fetch(`${Api}api/AccountApi/Register`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Id: 0,
  FirstName,
  LastName,
  CompanyName,
  StreetAddress,
  StreetAddress2,
  PostalCode,
  City,
  Phone,
  Email,
  Password,
  ConfirmPassword,
  CountryId,
  StateId
          }),
        });
  
        const resData = await response.json();
        console.log(resData)
      
  
        if (resData.success === false) {
          throw new Error(resData.message);
        }
        //   dispatch({
        //     type: ADD_ADDRESS,
        //     Address: {
        //       id,
        //       FlatNumber,
        //       BuildingNumber,
        //       RoadNumber,
        //       BlockNumber,
        //       Location,
        //       Nickname,
        //       PhoneNumber,
        //       ExtraDirection,
        //     },
        //   });
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    };
  };


//  demo Login starts here

export const UserInfo = () => {
    return async (dispatch, getState) => {
      const id = getState().Auth.Login.customerId

      const response = await fetch(`http://skybluewholesale.com:80/api/AccountApi/Info/${id}`, {
        method: "GET",
        
      });
  
      const resData = await response.json();
      console.log(resData);
      // console.log(resData.success);
  
      if (resData.success === false) {
        throw new Error(resData.message);
      }
  
      dispatch({
        type: USER_INFO,
        Info: resData,
  
      });

    };
  };


  //  PROFILE EDIT STARTS HERE

export const profileEditHandler = (
  FirstName,
  LastName,
  CompanyName,
  StreetAddress,
  StreetAddress2,
  PostalCode,
  City,
  Phone,
  Email,
  Password,
  ConfirmPassword,
  CountryId,
  StateId
) => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId
  

    const response = await fetch(`http://skybluewholesale.com:80/api/AccountApi/EditInfo`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
        FirstName,
        LastName,
        CompanyName,
        StreetAddress,
        StreetAddress2,
        PostalCode,
        City,
        Phone,
        Email,
        Password,
        ConfirmPassword,
        CountryId,
        StateId
      }),
    });

    const resData = await response.json();
    console.log(resData);
    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    // dispatch({
    //   type: USER_INFO,
    //   Info: resData,

    // });

  };
};



  // LOGOUT
  export const LogoutFunc = () => {
    return async (dispatch, getState) => {
      
    
      try {
        const response = await fetch(`http://skybluewholesale.com:80/api/AccountApi/LogOut`, {
          method: "GET"
        });
  
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const resData = await response.json();
        console.log(resData)
      
  
        dispatch({
          type: LOGOUT,
        });
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    };
  };
  
  
  

  // / demo Login starts here

export const Authenticate = (resData) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      Login: resData,

    });
  };
};


export const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Home" })],
  key: null,
});


const saveDataToStorage = (userData) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        userData: userData,
      })
    );
  };




  
  // LOGOUT
  export const fetchCountry = () => {
    return async (dispatch, getState) => {
      console.log('Yes ')
    
      try {
        const response = await fetch(`http://skybluewholesale.com:80/api/AccountApi/Countries`, {
          method: "GET"
        });
        
        const resData = await response.json();
        // console.log(resData)
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
      
  
        dispatch({
          type: COUNTRIES,
          country:resData.obj
        });
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    };
  };


  
// fetch Country
export const fetchState = (id) => {
  return async (dispatch, getState) => {

    const response = await fetch(
      `http://skybluewholesale.com:80/api/AccountApi/States?countryId=${id}`,
      {
        method: "GET"
      }
    );

    if (!response.ok) {
      throw new Error("Address Not Fetch");
    }

    const resData = await response.json();
    // console.log(resData);

    dispatch({
      type: FETCH_STATE,
      StatesProvince: resData.obj,
    });
  };
};
