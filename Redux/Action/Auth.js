export const LOGIN = "LOGIN";
export const USER_INFO = "USER_INFO";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const COUNTRIES = "COUNTRIES";
export const FETCH_STATE = "FETCH_STATE";
import { AsyncStorage } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
const Api = "http://skybluewholesale.com:80/";

// demo Login starts here

export const LoginUser = (email, password, navigation) => {
  return async (dispatch) => {
    await axios
      .get(
        `http://skybluewholesale.com:80/api/AccountApi/Login?username=${email}&password=${password}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data.success == true) {
          dispatch({
            type: LOGIN,
            Login: response.data,
          });
          navigation.navigate("Home");
          saveDataToStorage(response.data);
        }
        if (response.data.success === false) {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

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
  var postData = {
    Id: 0,
    FirstName: FirstName,
    LastName: LastName,
    CompanyName: CompanyName,
    StreetAddress: StreetAddress,
    StreetAddress2: StreetAddress2,
    PostalCode: PostalCode,
    City: City,
    Phone: Phone,
    Email: Email,
    Password: Password,
    ConfirmPassword: ConfirmPassword,
    CountryId: CountryId,
    StateId: StateId,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}api/AccountApi/Register`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.success == true) {
          console.log(response.data);
        }

        if (response.data.success === false) {
          throw new Error(response.data.message);
        }
        // navigation.navigate("MapMain");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//   AGENT REGISTRATION STARTS FORM HERE
// export const registrationFunc = (
//   FirstName,
//   LastName,
//   CompanyName,
//   StreetAddress,
//   StreetAddress2,
//   PostalCode,
//   City,
//   Phone,
//   Email,
//   Password,
//   ConfirmPassword,
//   CountryId,
//   StateId
// ) => {
//   return async (dispatch, getState) => {
//     // const userId = getState().auth.userId;
//     // const token = getState().auth.token;
//     // console.log(userId);
//     // console.log(token)

//     try {
//       const response = await fetch(`${Api}api/AccountApi/Register`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           Id: 0,
//           FirstName,
//           LastName,
//           CompanyName,
//           StreetAddress,
//           StreetAddress2,
//           PostalCode,
//           City,
//           Phone,
//           Email,
//           Password,
//           ConfirmPassword,
//           CountryId,
//           StateId,
//         }),
//       });

//       const resData = await response.json();
//       console.log(resData);

//       if (resData.success === false) {
//         throw new Error(resData.message);
//       }
//       //   dispatch({
//       //     type: ADD_ADDRESS,
//       //     Address: {
//       //       id,
//       //       FlatNumber,
//       //       BuildingNumber,
//       //       RoadNumber,
//       //       BlockNumber,
//       //       Location,
//       //       Nickname,
//       //       PhoneNumber,
//       //       ExtraDirection,
//       //     },
//       //   });
//     } catch (err) {
//       console.log(err.message);
//       throw err;
//     }
//   };
// };

//  demo Login starts here

// export const UserInfo = () => {
//   return async (dispatch, getState) => {
//     const id = getState().Auth.Login.customerId;

//     const response = await fetch(
//       `${Api}api/AccountApi/Info/${id}`,
//       {
//         method: "GET",
//       }
//     );

//     const resData = await response.json();
//     console.log(resData);
//     // console.log(resData.success);

//     if (resData.success === false) {
//       throw new Error(resData.message);
//     }

//     dispatch({
//       type: USER_INFO,
//       Info: resData,
//     });
//   };
// };

export const UserInfo = (email, password, navigation) => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .get(`${Api}api/AccountApi/Info/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data);
        dispatch({
          type: USER_INFO,
          Info: response.data,
        });
        if (response.data.success === false) {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//  PROFILE EDIT STARTS HERE

// export const profileEditHandler = (
//   FirstName,
//   LastName,
//   CompanyName,
//   StreetAddress,
//   StreetAddress2,
//   PostalCode,
//   City,
//   Phone,
//   Email,
//   Password,
//   ConfirmPassword,
//   CountryId,
//   StateId
// ) => {
//   return async (dispatch, getState) => {
//     const id = getState().Auth.Login.customerId;

//     const response = await fetch(
//       `http://skybluewholesale.com:80/api/AccountApi/EditInfo`,
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           Id: id,
//           FirstName,
//           LastName,
//           CompanyName,
//           StreetAddress,
//           StreetAddress2,
//           PostalCode,
//           City,
//           Phone,
//           Email,
//           Password,
//           ConfirmPassword,
//           CountryId,
//           StateId,
//         }),
//       }
//     );

//     const resData = await response.json();
//     console.log(resData);
//     // console.log(resData.success);

//     if (resData.success === false) {
//       throw new Error(resData.message);
//     }

//     // dispatch({
//     //   type: USER_INFO,
//     //   Info: resData,

//     // });
//   };
// };

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
  var postData = {
    Id: 0,
    FirstName: FirstName,
    LastName: LastName,
    CompanyName: CompanyName,
    StreetAddress: StreetAddress,
    StreetAddress2: StreetAddress2,
    PostalCode: PostalCode,
    City: City,
    Phone: Phone,
    Email: Email,
    Password: Password,
    ConfirmPassword: ConfirmPassword,
    CountryId: CountryId,
    StateId: StateId,
  };

  return async (dispatch) => {
    await axios
      .post(`${Api}api/AccountApi/EditInfo`, postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.success == true) {
          console.log(response.data);
        }

        if (response.data.success === false) {
          throw new Error(response.data.message);
        }
        // navigation.navigate("MapMain");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

// // LOGOUT

export const LogoutFunc = (email, password, navigation) => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/AccountApi/LogOut`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data);
        dispatch({
          type: LOGOUT,
        });
      })
      .catch((error) => {
        console.log(response.data.message);
        throw error;
      });
  };
};

// export const LogoutFunc = () => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(
//         `http://skybluewholesale.com:80/api/AccountApi/LogOut`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Something Went Wrong");
//       }
//       const resData = await response.json();
//       console.log(resData);

//       dispatch({
//         type: LOGOUT,
//       });
//     } catch (err) {
//       console.log(err.message);
//       throw err;
//     }
//   };
// };

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

export const fetchCountry = () => {
  return async (dispatch) => {
    await axios
      .get(`${Api}api/AccountApi/Countries`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response.obj);
        dispatch({
          type: COUNTRIES,
          country: response.data.obj,
        });
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
};

// fetch State
export const fetchState = () => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .get(`${Api}api/AccountApi/States?countryId=1`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        dispatch({
          type: FETCH_STATE,
          StatesProvince: response.data.obj,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };
};
