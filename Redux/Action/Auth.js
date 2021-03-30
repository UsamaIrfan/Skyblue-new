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

export const LoginUser = (email, password, navigation, showSimpleMessage) => {
  return async (dispatch) => {
    await axios
      .get(
        `http://skybluewholesale.com:80/api/AccountApi/Login?username=${email}&password=${password}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.data.success == true) {
          dispatch({
            type: LOGIN,
            Login: response.data,
          });
          navigation.navigate("Home");
          showSimpleMessage("success", {
            message: "Logged In successfully.",
          });
          saveDataToStorage(response.data);
        }
        if (response.data.success === false) {
          showSimpleMessage("success", {
            message: "Failed To Login.",
            description: `${response.data.message}`,
          });
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
        if (response.data.success == true) {
          console.log(response.data);
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

export const UserInfo = (email, password, navigation) => {
  return async (dispatch, getState) => {
    const id = getState().Auth.Login.customerId;
    await axios
      .get(`${Api}api/AccountApi/Info/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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
        if (response.data.success == true) {
          console.log(response.data);
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

// // LOGOUT

export const LogoutFunc = (email, password, navigation) => {
  return async (dispatch) => {
    await axios
      .get(`${Api}/api/AccountApi/LogOut`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
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
