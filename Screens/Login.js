import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
  useRef,
  createRef,
} from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  I18nManager,
  ScrollView,
} from "react-native";
import ImageComp from "../COMPONENTS/UI/Image";
import Input from "../COMPONENTS/Forms/InputField";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../Constant";
import Modal from "react-native-modal";
import { useIsFocused } from "@react-navigation/native";
import * as authActions from "../Redux/Action/Auth";

import Constants from "expo-constants";

// BELOW ARE COUNTRIES
const Countries = [
  {
    id: 2,
    code: "+1",
    uri: require("../assets/Icons/canada.png"),
  },
  { id: 1, code: "+811", uri: require("../assets/Icons/saudi-arabia.png") },

  {
    id: 3,
    code: "+972",
    uri: require("../assets/Icons/united-states.png"),
  },
  {
    id: 4,
    code: "+966",
    uri: require("../assets/Icons/canada.png"),
  },
];

const LOGIN = "LOGIN";

// Reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      const updateValues = {
        ...state.InputValues,
        [action.inputId]: action.value,
      };
      console.log(updateValues);

      const updateValidities = {
        ...state.InputValidates,
        [action.inputId]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (let key in updateValidities) {
        updatedFormIsValid = updatedFormIsValid && updateValidities[key];
      }
      return {
        InputValues: updateValues,
        InputValidates: updateValidities,
        formisValid: updatedFormIsValid,
      };
  }
  return state;
};

const { width, height } = Dimensions.get("window");
console.log(height);

const Login = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [Inputi, setInputi] = useState(false);
  const [pushToken, setPushToken] = useState();
  const [HideComponents, setHideComponents] = useState(false);
  const [loginSelection, setLoginSelection] = useState("Mobile");
  const [MobileNumber, setMobileNumber] = useState();
  const [userData, setUserData] = useState();
  const [userCode, setUserCode] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [countrySelect, setCountrySelect] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCountryUri, setSelectedCountryUri] = useState(
    require("../assets/Icons/phone-list.png")
  );

  // Keyaord Func

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setHideComponents(true);
  };

  const _keyboardDidHide = () => {
    setHideComponents(false);
  };

  const fetchCountryHandler = async () => {
    console.log("Someone Called");
    await dispatcher(authActions.fetchCountry());
  };

  useEffect(() => {
    fetchCountryHandler();
  });

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Email: "",
      Password: "",
    },

    InputValidates: {
      Email: false,
      Password: false,
    },
    formisValid: false,
  });

  const inputHandler = useCallback(
    (value, isValid, id) => {
      dispatch({
        type: LOGIN,
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const inputHandlerMobile = useCallback(
    (value, isValid, id) => {
      setMobileNumber(value);
    },
    [MobileNumber]
  );

  // Call to Server code start below
  // admin@yourstore.com
  // 123456

  // useEffect(() => {

  // }, [isLoading]);

  const goToDrawerHandler = () => {
    navigation.navigate("Home");
  };

  const isFocused = useIsFocused();

  const dispatcher = useDispatch();
  const authenticateHandler = async () => {
    setCount(count + 1);
    //         let EmailOrMobile;
    //         if(loginSelection === 'Mobile') {
    // EmailOrMobile = MobileNumber
    //         }else{
    //           EmailOrMobile = inputState.InputValues.Email
    //         }
    //         console.log(EmailOrMobile)
    console.log("Me Called");

    try {
      setIsLoading(true);
      await dispatcher(
        authActions.LoginUser(
          loginSelection === "Mobile"
            ? MobileNumber
            : inputState.InputValues.Email,
          inputState.InputValues.Password,
          navigation,
        )
      );

      setIsLoading(false);

      // const user = userObj;
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);

      Alert.alert("Cant Login", err.message);
    }
    // navigation.navigate("AgentDrawer", {
    //   name: "CustomerListStack",
    // });
  };

  //   //   Select COuntry handler
  const selectCountryHandler = (item) => {
    setSelectedCountryCode(item.code);
    setSelectedCountryUri(item.uri);
    setCountrySelect(false);
  };

  // Auth Code Ends here

  // // AUTH MOBILE HANDLER

  // const authenticationMobileHandler = async () => {

  //   console.log("i just click");
  //   console.log(selectedCountryCode+MobileNumber)

  //   try {
  //     setIsLoading(true)

  //     const response = await fetch(
  //       `${Api}api/agent/get-customer-by-phone`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           phone: selectedCountryCode + MobileNumber
  //         }),
  //       }
  //     );
  //     setIsLoading(false)

  //     if (!response.ok) {
  //       throw new Error("Something Went Wrong");
  //     }

  //     const resData = await response.json();
  //  if(resData.success === true) {
  //    setUserData(resData)
  //    setIsVisible(true)
  //    console.log('Succes')
  //  }else{
  //   Alert.alert('Invalid Phone Number', "Mobile number you entered is not registered" , [{text:'OK'}])
  //  }

  //   } catch (err) {
  //     Alert.alert('Invalid Phone Number')
  //   }
  // };

  // // Forgot Password code starts here

  // const forgotHandler = () => {
  //   try {
  //     dispatcher(productActions.ForgotPassword(inputState.InputValues.Email));
  //   } catch (err) {
  //     Alert.alert("Forgot Password", err.message);
  //   }
  // };

  // temp

  // // create our ref
  // const myInput1 = useRef();
  // const myInput2 = useRef();
  // const myInput = useRef();
  const secondRef = createRef(null);
  const thirdRef = useRef(null);

  const input1 = useRef();
  const input2 = useRef();

  //  // check Validation Code
  //  const checkCodeHandler = async() =>{
  //   let isValidCode
  //   console.log(userCode)
  //   console.log(userData)
  //   setIsVisible(false)

  //   // setIsVisible(true)

  //   try {
  //     // cons
  //     console.log('m running')

  //     const response = await fetch(
  //       `${Api}api/agent/validate-twilio-code/${userData.userId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           phone: selectedCountryCode + MobileNumber,
  //           customerId: userData.userId,
  //           twilioCode: userCode,
  //           type: 1
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something Went Wrong");
  //     }

  //     const resData = await response.json();
  //     console.log(resData)

  //  if(resData.success === true) {

  //    console.log('Succes')

  //    await dispatcher(
  //     productActions.LoginUserWithMobile(
  //       userData,
  //       pushToken
  //     )
  //   );
  //  }else{
  //   Alert.alert('Invalid Code', "Code you entered is not InValid!" , [{text:'TRY AGAIN', onPress: ()=> setIsVisible(true)}])
  //  }

  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      {/* Verfication Code Popup working starts here */}

      {/* Verification Code Modal */}
      <Modal
        style={{ margin: 0, marginBottom: 0 }}
        isVisible={isVisible || countrySelect}
        deviceWidth={width}
        deviceHeight={height}
        // onBackdropPress={() => setCountrySelect(false)}
        swipeDirection="down"
        // onSwipeComplete={() => setIsVisible(false)}
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
      >
        {countrySelect ? (
          <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
            <View
              style={{
                width: "100%",

                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 20,
                  alignItems: "flex-end",
                  marginTop: 20,
                }}
              >
                <ImageComp
                  onPress={() => setCountrySelect(false)}
                  width={22}
                  height={22}
                  imageUri={require("../assets/Icons/close.png")}
                ></ImageComp>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontWeight: "700", fontSize: 20 }}>
                  Select Country
                </Text>
                <View
                  style={{
                    width: "100%",
                    marginTop: 35,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{ width: "100%", height: 150, marginBottom: 20 }}
                  >
                    <ScrollView>
                      {Countries.map((item) => (
                        <TouchableOpacity
                          onPress={() => selectCountryHandler(item)}
                          key={item.id}
                          style={{
                            width: "100%",
                            backgroundColor:
                              item.code === selectedCountryCode
                                ? "#e5e5e5"
                                : null,

                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            flexDirection: "row",
                          }}
                        >
                          <ImageComp
                            Icon
                            width={20}
                            height={20}
                            imageUri={item.uri}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              marginLeft: 15,

                              color: "#747474",
                            }}
                          >
                            {item.code}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: "75%",

                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 20,
              }}
            >
              {/* <View style={{ width: "100%", paddingLeft: 12, paddingTop: 12 }}>
                <ImageComp
                  onPress={() => setIsVisible(false)}
                  width={18}
                  height={18}
                  imageUri={require("../../../assets/Assets/Login/close.png")}
                ></ImageComp>
              </View> */}

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "#528BD0", marginTop: 10 }}>
                  Enter Verification Code
                </Text>

                <Text
                  style={{ fontSize: 14, marginTop: 5, textAlign: "center" }}
                >
                  Please enter your verification code send to your mobile.
                </Text>

                <TextInput
                  onChangeText={(e) => setUserCode(e)}
                  value={userCode}
                  keyboardType="number-pad"
                  placeholder="Enter Code"
                  style={{
                    width: "80%",
                    paddingHorizontal: 10,
                    height: 45,
                    borderColor: "#e5e5e5",
                    borderWidth: 1.5,
                    marginTop: 20,
                  }}
                ></TextInput>

                {/* <Input
                noIcon
                NoPlaceHolder="Enter Your Phone number"
                required
                returnKeyType="next"
                email
                id="PhoneNumber"
                inputFieldHandler={() => {}}
                errorMessage="Please enter Email"
                imageUri={require("../../../assets/Assets/Login/Email.png")}
              /> */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    //   onPress={checkCodeHandler}
                    style={{
                      width: "45%",
                      height: 40,
                      backgroundColor: "#528BD0",
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "white" }}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsVisible(false)}
                    style={{
                      width: "45%",
                      height: 40,
                      backgroundColor: colors.Grey,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "white" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
      {/* Modal Code ends here */}

      {HideComponents === true && height < 640 ? null : (
        <View
          style={{
            width: "100%",

            justifyContent: "center",
            alignItems: "center",
            paddingTop: StatusBar.currentHeight + 40,
            marginBottom: 40,
          }}
        >
          <ImageComp
            Icon
            imageUri={require("../assets/Logo.png")}
            width={"60%"}
            height={HideComponents ? 50 : 100}
          />
        </View>
      )}

      <View
        style={{
          width: "100%",
        }}
      >
        {loginSelection === "Mobile" ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                width: "90%",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 14,
                  color: colors.Grey,
                  letterSpacing: 1.2,
                  fontFamily: "Regular",
                }}
              >
                Mobile Number
              </Text>
            </View>

            <View style={{ alignItems: "center", width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",

                  borderBottomWidth: 2,
                  borderBottomColor: "#e5e5e5",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "90%",
                  marginBottom: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => setCountrySelect(true)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <ImageComp
                    Icon
                    width={20}
                    height={20}
                    imageUri={selectedCountryUri}
                  />
                  <Text
                    style={{
                      fontFamily: "Bold",
                      color: colors.DarkGrey,
                      fontSize: 16,
                      marginLeft: 6,
                      marginRight: 4,
                    }}
                  >
                    {selectedCountryCode}
                  </Text>
                  <ImageComp
                    Icon
                    width={10}
                    height={10}
                    imageUri={require("../assets/Icons/dropdown.png")}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder={null}
                  returnKeyType="next"
                  keyboardType="phone-pad"
                  onSubmitEditing={() => input2.current.focus()}
                  onChangeText={inputHandlerMobile}
                  // autoFocus={true}

                  value={MobileNumber}
                  style={{
                    width: "100%",
                    paddingVertical: 7,
                    fontSize: 17,
                    textAlign: I18nManager.isRTL ? "right" : "left",

                    color: colors.Black,

                    paddingLeft: !I18nManager.isRTL ? 15 : null,
                    fontSize: 16,
                    fontFamily: "Regular",
                    letterSpacing: 0.5,
                  }}
                ></TextInput>
              </View>
            </View>
            <Input
              ref={input2}
              Login
              Label="Password"
              password
              min={5}
              imageUri={require("../assets/Icons/password_new.png")}
              required
              done
              returnKeyType="done"
              onSubmitEditing={authenticateHandler}
              label="EMAIL ADDRESS"
              id="Password"
              inputFieldHandler={inputHandler}
              errorMessage="Please enter password"
              // onSubmitEditing={authenticateHandler}
              placeholder="Password"
            />
          </View>
        ) : (
          <View>
            <Input
              onSubmitEditing={() => secondRef.current.focus()}
              Login
              Label="Email"
              required
              returnKeyType="next"
              email
              label="EMAIL ADDRESS"
              id="Email"
              inputFieldHandler={inputHandler}
              errorMessage="Please enter email"
              imageUri={require("../assets/Icons/email_new.png")}
              blurOnSubmit={false}
              placeholder="Email"
            />
            <Input
              ref={secondRef}
              Login
              Label="Password"
              password
              min={5}
              imageUri={require("../assets/Icons/password_new.png")}
              required
              done
              returnKeyType="next"
              label="EMAIL ADDRESS"
              id="Password"
              inputFieldHandler={inputHandler}
              errorMessage="Please enter password"
              // onSubmitEditing={authenticateHandler}
              placeholder="Password"
            />
          </View>
        )}

        {/* <TextInput
            ref={secondRef}
            placeholder="Enter Second"
            style={{ width: "100%", height: 40, backgroundColor: "#e5e5e5" }}
          ></TextInput> */}
        {/* <TextInput
            ref={thirdRef}
            placeholder="Enter Second"
            style={{ width: "100%", height: 40, backgroundColor: "#e5e5e5" }}
          ></TextInput> */}
        <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity
            onPress={authenticateHandler}
            //   onPress={loginSelection === 'Mobile' ? authenticationMobileHandler : authenticateHandler}
            // onPress={() => navigation.navigate("MainDrawer")}
            style={{
              width: "80%",
              height: 55,
              backgroundColor: colors.Blue,

              justifyContent: "center",
              alignItems: "center",
              borderRadius: 125,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size={16} color="white" />
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Bold",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            // onPress={() => navigation.navigate("MainDrawer")}
            style={{
              width: "80%",
              height: 55,

              marginTop: 20,

              justifyContent: "center",
              alignItems: "center",
              borderRadius: 125,
              borderColor: "#484848",
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontFamily: "Bold",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
            }}
          >
            <View
              style={{ width: "35%", height: 1, backgroundColor: "#e5e5e5" }}
            ></View>
            <Text style={{ marginHorizontal: 10, fontFamily: "Regular" }}>
              OR
            </Text>
            <View
              style={{ width: "35%", height: 1, backgroundColor: "#e5e5e5" }}
            ></View>
          </View>

          {loginSelection === "Mobile" ? (
            <TouchableOpacity
              style={{
                width: "80%",
                height: 55,
                backgroundColor: colors.Black,

                justifyContent: "center",
                alignItems: "center",
                borderRadius: 125,
              }}
              onPress={() => setLoginSelection("Email")}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  fontFamily: "Bold",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                Login with Email?
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 55,
                  backgroundColor: colors.Black,

                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 125,
                }}
                onPress={() => setLoginSelection("Mobile")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontFamily: "Bold",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                  }}
                >
                  Login with Mobile?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
