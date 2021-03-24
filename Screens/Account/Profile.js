import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
  createRef,
} from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  TextInput,
  I18nManager,
} from "react-native";
import ImageComp from "../../COMPONENTS/UI/Image";
import Input from "../../COMPONENTS/Forms/InputField";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../COMPONENTS/Button";
import * as authActions from "../../Redux/Action/Auth";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../../Constant";
import { cos } from "react-native-reanimated";

const Countries = [
  {
    id: 2,
    code: "+1",
    uri: require("../../assets/Icons/canada.png"),
  },
  { id: 1, code: "+811", uri: require("../../assets/Icons/united-states.png") },

  {
    id: 3,
    code: "+972",
    uri: require("../../assets/Icons/canada.png"),
  },
  {
    id: 4,
    code: "+966",
    uri: require("../../assets/Icons/saudi-arabia.png"),
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
      // console.log(updateValues);

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

const Sizes = ["Small", "Medium", "Large", "Very Large"];

const UserInfo = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [countrySelect, setCountrySelect] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCountryUri, setSelectedCountryUri] = useState(
    require("../../assets/Icons/phone-list.png")
  );

  const [gender, setGender] = useState("");
  const [isStateLoading, setStateLoading] = useState(false);

  // ADDRESS STATES
  const [countryId, setCountryId] = useState(0);
  const [countryName, setCountryName] = useState("Select Country");
  const [stateName, setStateName] = useState("Select State/Province");
  const [stateId, setStateId] = useState(0);

  const ProfileInfo = useSelector((state) => state.Auth.Info);
  const [MobileNumber, setMobileNumber] = useState(ProfileInfo.Phone);
  const fetchCountries = useSelector((state) => state.Auth.Countries);
  // console.log(fetchCountries);

  const fetchState = useSelector((state) => state.Auth.StatesProvince);

  useEffect(() => {
    const countryNameSet = fetchCountries.find(
      (item) => item.Value === ProfileInfo?.CountryId.toString()
    );
    setCountryName(countryNameSet?.Text);
    setCountryId(countryNameSet?.Value);
  }, []);

  //   States for Calendar
  const [StartDate, selectedStartDate] = useState("Select Date");
  const [calendar, setCalendar] = useState(false);

  const [isImage, setImage] = useState(
    route.params?.productSelect ? route.params?.productSelect[0].uri : null
  );

  const inputHandlerMobile = useCallback(
    (value, isValid, id) => {
      setMobileNumber(value);
    },
    [MobileNumber]
  );

  //   //   Select COuntry handler
  const selectCountryHandler = (item) => {
    setSelectedCountryCode(item.code);
    setSelectedCountryUri(item.uri);
    setCountrySelect(false);
  };

  

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      FirstName: ProfileInfo ? ProfileInfo.FirstName : "",
      LastName: ProfileInfo ? ProfileInfo.LastName : "",

      Street: ProfileInfo ? ProfileInfo.StreetAddress : "",
      StreetNumber: ProfileInfo ? ProfileInfo.StreetAddress2 : "",
      PostalCode: ProfileInfo ? ProfileInfo.PostalCode : "",
      City: ProfileInfo ? ProfileInfo.City : "",
      CompanyName: ProfileInfo ? ProfileInfo.CompanyName : "",

      Email: ProfileInfo ? ProfileInfo.Email : "",
      Password: ProfileInfo ? ProfileInfo.Password : "",
    },

    InputValidates: {
      FirstName: true,
      LastName: true,

      Street: true,
      StreetNumber: true,
      PostalCode: true,
      City: true,

      Email: true,
      CompanyName: true,
    },
    formisValid: true,
  });

  // COUNTRY AND STATE LOGIN
  const stateSetHandler = async () => {
    setStateLoading(true);
    await dispatcher(authActions.fetchState(countryId));
    setStateLoading(false);
  };

  useEffect(() => {
    stateSetHandler();
  }, [countryId, countryName]);

  // Country Set Handler starts here
  const countrySetHandler = (name, id) => {
    setCountryName(name);
    setCountryId(id);
    setIsVisible(false);
  };
  // Country set Handler ends here

  // state Set Handler Start here
  const stateHandler = (id, Text) => {
    setStateId(id);
    setStateName(Text);
    setIsInvitationVisible(false);
  };

  // END HERE

  //   Calendaer Code Starts here
  const onDateChange = (date) => {
    let dateExtract = date.toString().substring(0, 15);
    // console.log(dateExtract);
    selectedStartDate(dateExtract);

    setCalendar(false);
  };

  const calendarHandler = () => {
    setCalendar(calendar === true ? false : true);
    // console.log(calendar);
  };

  const inputHandler = useCallback(
    (value, isValid, id) => {
      if (id === "BusinessType") {
        setIsVisible(false);
      }

      dispatch({
        type: LOGIN,
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const dispatcher = useDispatch();

  const clientRegistrationHandler = async () => {
    let CellPhone = selectedCountryCode + MobileNumber;
    // console.log(CellPhone);
    if (inputState.formisValid) {
      try {
        const {
          FirstName,
          LastName,

          Street,
          StreetNumber,
          PostalCode,
          City,
          CompanyName,

          Email,
          Password,
        } = inputState.InputValues;

        setIsLoading(true);
        await dispatcher(
          authActions.profileEditHandler(
            FirstName,
            LastName,
            CompanyName,
            Street,
            StreetNumber,
            PostalCode,
            City,
            CellPhone,
            Email,
            Password,
            Password,
            countryId,
            stateId
          )
        );
        setIsLoading(false);

        Alert.alert(
          "Profile Updated!",
          "Your Profile has been sucessfully update",
          [{ text: "OK" }]
        );
      } catch (err) {
        Alert.alert("Something Went Wrong!", err.message, [
          { text: "TRY AGAIN" },
        ]);
        setIsLoading(false);
      }
    } else {
      console.log("not work");
    }
  };

  // References for fields

  const LastName = createRef(null);
  const CompanyName = createRef(null);
  const Street = createRef(null);
  const StreetNumber = createRef(null);
  const PostalCode = createRef(null);
  const City = createRef(null);
  const Phone = createRef(null);
  const Email = createRef(null);
  const Password = createRef(null);
  const ConfirmPassword = createRef(null);
  const Gender = createRef(null);

  // // Start Code for Pick Image
  // // Image Upload Handler
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 0.5,
  //     base64: true,
  //   });

  //   // console.log(result);

  //   const manipResult = await ImageManipulator.manipulateAsync(
  //     result.uri,
  //     [{ resize: { width: 250 } }],
  //     { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  //   );
  //   console.log(manipResult);

  //   // console.log(result.base64);

  //   if (!result.cancelled) {
  //     setImage(manipResult.uri);
  //   }

  //   // TO GET IMAGE NAME AND IMAGE TYPE
  //   let localUri = manipResult.uri;

  //   let filename = localUri.split("/").pop();
  //   console.log(filename);

  //   // // Infer the type of the image
  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = match ? `image/${match[1]}` : `image`;
  //   console.log(type);

  //   setImageUri(manipResult.base64);
  //   setImageName(filename);
  //   setImageType(type);

  // // SERVER CODE START FROM HERE
  // try {
  //   const response = await fetch(
  //     `${Api}api/agent/add-agent-logo/${agendId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       body: JSON.stringify({
  //         agentId: agendId,
  //         clientId: 0,
  //         documentId: 0,
  //         name: filename,
  //         type: type,
  //         uri: `data:${type}; base64,${manipResult.base64}`,
  //       }),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Something Went Wrong");
  //   }

  //   const resData = await response.json();
  //   console.log(resData);
  // } catch (err) {
  //   console.log(err.message);
  //   throw err;
  // }
  // };
  // End Code for Pick Image

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
      {/* This Modal is for COuntry and state */}
      <Modal
        style={{ margin: 0, marginBottom: 0 }}
        isVisible={isVisible || isInvitationVisible}
        deviceWidth={width}
        deviceHeight={height}
        onBackdropPress={() => setIsVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsVisible(false)}
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
      >
        {isVisible === true ? (
          <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: height - 40,
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
                  onPress={() => setIsVisible(false)}
                  width={22}
                  height={22}
                  imageUri={require("../../assets/Icons/close.png")}
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
                  <ScrollView>
                    {fetchCountries.map((item) => (
                      <TouchableOpacity
                        // onPress={() =>
                        //   inputHandler(item, true, "BusinessType")
                        // }
                        onPress={() => countrySetHandler(item.Text, item.Value)}
                        key={item.Value}
                        style={{
                          width: "100%",

                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,

                            color: "#747474",
                          }}
                        >
                          {item.Text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: height - 40,
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
                  onPress={() => setIsInvitationVisible(false)}
                  width={22}
                  height={22}
                  imageUri={require("../../assets/Icons/close.png")}
                ></ImageComp>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontWeight: "700", fontSize: 20 }}>
                  Select State
                </Text>
                <View
                  style={{
                    width: "100%",
                    marginTop: 35,
                    alignItems: "center",
                  }}
                >
                  <ScrollView>
                    {fetchState.map((item) => (
                      <TouchableOpacity
                        onPress={() => stateHandler(item.Value, item.Text)}
                        key={item.Value}
                        style={{
                          width: "100%",

                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,

                            color: "#747474",
                          }}
                        >
                          {item.Text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
      {/* Modal Code ends here */}

      {/* Verification Code Modal */}
      <Modal
        style={{ margin: 0, marginBottom: 0 }}
        isVisible={countrySelect}
        deviceWidth={width}
        deviceHeight={height}
        // onBackdropPress={() => setCountrySelect(false)}
        swipeDirection="down"
        // onSwipeComplete={() => setIsVisible(false)}
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
      >
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
                imageUri={require("../../assets/Icons/close.png")}
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
                <View style={{ width: "100%", height: 150, marginBottom: 20 }}>
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
      </Modal>
      {/* Modal Code ends here */}
      <ScrollView>
        <View style={{ width: "100%", marginTop: 10 }}>
          {/* product Dropdown */}
          <Input
            onSubmitEditing={() => LastName.current.focus()}
            Label="First Name"
            NoPlaceHolder="Full Name"
            initialValue={inputState.InputValues.FirstName}
            required
            returnKeyType="next"
            id="FirstName"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter FirstName"
          />

          <Input
            ref={LastName}
            onSubmitEditing={() => CompanyName.current.focus()}
            Label="Last Name"
            initialValue={inputState.InputValues.LastName}
            NoPlaceHolder="Full Name"
            required
            returnKeyType="next"
            id="LastName"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter LastName"
          />
          <Input
            ref={CompanyName}
            onSubmitEditing={() => Street.current.focus()}
            Label="Company Name"
            NoPlaceHolder="Full Name"
            initialValue={inputState.InputValues.CompanyName}
            required
            returnKeyType="next"
            id="CompanyName"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter LastName"
          />
          {/* <Input
           ref={DateOfBirth}
            onSubmitEditing={() => Street.current.focus()}
            Label="Date of Birth"
            NoPlaceHolder="Full Name"
            required
            returnKeyType="next"
            id="DateOfBirth"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter DateOfBirth:"
       
          /> */}

          {/* <View style={{width:'100%'}}>
        <TouchableOpacity
          onPress={calendarHandler}
          style={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 5,
            marginBottom: 7,
          }}
        >
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#e5e5e5",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              width: I18nManager.isRTL ? "90%" : "85%",
              paddingBottom: 7,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  paddingVertical: 7,
                  paddingRight: 15,
                  fontSize: 15,
                  textAlign: "right",
                }}
              >
                {StartDate}
              </Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <ImageComp
                onPress={calendarHandler}
                Icon
                width={22}
                height={22}
                imageUri={require("../../assets/Icons/calendar.png")}
              />
            </View>
          </View>
        </TouchableOpacity>


      {calendar === true ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            top: 45,
            zIndex: 99999,
          }}
        >
          <View
            style={{
              width: "90%",
              borderColor: "#e5e5e5",
              borderRadius: 8,
              borderWidth: 2,
              paddingHorizontal: 5,
              marginTop: 2,
              paddingVertical: 14,

              backgroundColor: "white",
            }}
          >
            <CalendarPicker width={width - 30} onDateChange={onDateChange} />
          </View>
        </View>): null}
        </View>  */}

          <Input
            ref={Street}
            onSubmitEditing={() => StreetNumber.current.focus()}
            Label="Street Address"
            initialValue={inputState.InputValues.Street}
            NoPlaceHolder="Full Name"
            required
            returnKeyType="next"
            id="Street"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter Street:"
          />
          <Input
            ref={StreetNumber}
            onSubmitEditing={() => PostalCode.current.focus()}
            Label="Street Address 2"
            initialValue={inputState.InputValues.StreetNumber}
            NoPlaceHolder="Full Name"
            required
            returnKeyType="next"
            id="StreetNumber"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter StreetNumber"
          />
          <Input
            ref={PostalCode}
            onSubmitEditing={() => City.current.focus()}
            Label="Postal Code"
            NoPlaceHolder="Full Name"
            initialValue={inputState.InputValues.PostalCode}
            required
            returnKeyType="next"
            id="PostalCode"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter PostalCode"
          />
          <Input
            ref={City}
            onSubmitEditing={() => Phone.current.focus()}
            Label="City"
            NoPlaceHolder="Full Name"
            initialValue={inputState.InputValues.City}
            required
            returnKeyType="next"
            id="City"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter City"
          />

          {/* Country Id Dropdown */}
          {/* product Dropdown */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={{ width: "82%", alignItems: "flex-start" }}>
              <Text style={{ textTransform: "uppercase", color: "#a7a7a7" }}>
                COUNTRY
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              width: "100%",
              alignItems: "center",
              paddingVertical: 5,
              marginBottom: 7,
            }}
          >
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#e5e5e5",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "85%",
                paddingBottom: 7,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    paddingVertical: 7,
                    paddingLeft: 8,
                    fontSize: 17,
                    textAlign: "left",
                  }}
                >
                  {countryName}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  alignItems: "flex-end",
                }}
              >
                <ImageComp
                  Icon
                  width={12}
                  height={12}
                  imageUri={require("../../assets/Icons/dropdown.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/* End here Country Id Dropdown */}

          {/* State Starts here */}

          {fetchState.length === 1 &&
          fetchState[0]?.Text === "address.selectstates" ? null : (
            <View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: "80%", alignItems: "flex-start" }}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      color: "#a7a7a7",
                    }}
                  >
                    STATE
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsInvitationVisible(true)}
                style={{
                  width: "100%",
                  alignItems: "center",
                  paddingVertical: 5,
                  marginBottom: 7,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#e5e5e5",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "85%",
                    paddingBottom: 7,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "50%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 7,
                        paddingLeft: 8,
                        fontSize: 17,
                        textAlign: "left",
                      }}
                    >
                      {stateName}
                    </Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <ImageComp
                      Icon
                      width={12}
                      height={12}
                      imageUri={require("../../assets/Icons/dropdown.png")}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* Staete End here */}
          {/* State End here */}

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 15,
              marginTop: 10,
            }}
          >
            <View style={{ width: "95%", alignItems: "center" }}>
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
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setCountrySelect(true)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <ImageComp
                      onPress={() => setCountrySelect(true)}
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
                      onPress={() => setCountrySelect(true)}
                      Icon
                      width={10}
                      height={10}
                      imageUri={require("../../assets/Icons/dropdown.png")}
                    />
                  </TouchableOpacity>

                  <TextInput
                    ref={Phone}
                    placeholder={null}
                    onSubmitEditing={() => Email.current.focus()}
                    keyboardType="phone-pad"
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
            </View>
          </View>

          <Input
            ref={Email}
            onSubmitEditing={() => Password.current.focus()}
            Label="Email"
            NoPlaceHolder="Address"
            initialValue={inputState.InputValues.Email}
            required
            email
            returnKeyType="next"
            id="Email"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter Email"
          />
          <Input
            ref={Password}
            // onSubmitEditing={() => ConfirmPassword.current.focus()}
            Label="Password"
            NoPlaceHolder="Email"
            required
            returnKeyType="next"
            secureTextEntry={true}
            initialValue={inputState.InputValues.Password}
            id="Password"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter Password"
          />
          {/* <Input
            ref={ConfirmPassword}
            onSubmitEditing={() => Gender.current.focus()}
            Label="Confirm Password"
            NoPlaceHolder="Facebook"
           
            returnKeyType="next"
            id="ConfirmPassword"
            inputFieldHandler={inputHandler}
            errorMessage="Please enter ConfirmPassword"
          
          /> */}
          {/* <Input
            ref={Gender}
            // onSubmitEditing={clientRegistrationHandler}
            Label="Gender"
            NoPlaceHolder="Gender"
            required
            returnKeyType="next"
            id="Gender"
            done
            inputFieldHandler={inputHandler}
            errorMessage="Please enter Gender"
          
          /> */}

          {/* <View style={{width:'100%', alignItems:'center', marginBottom:15, marginTop:10}}>
            <View style={{width:'95%' ,alignItems:'center'}}>
            <View
            style={{
              width: "90%",
              alignItems: "flex-start",
              marginBottom:15
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
              Gender
            </Text>
          </View>

          <View style={{ alignItems: "center", width:'100%' }}>
        <View
          style={{
            flexDirection: "row",

        
            justifyContent: "flex-start",
            alignItems: "center",
            width: "90%",
          }}
        >
          <View style={{flexDirection:'row', width:'50%'}}>
          <TouchableOpacity  onPress={()=> setGender('male')} style={{width:25, height:25, borderColor:'#a7a7a7', borderWidth:2, justifyContent:'center', alignItems:'center'}}>
              {gender === 'male' ? <ImageComp onPress={()=> setGender('male')} Icon width={15} height={15} imageUri={require("../../assets/Icons/select.png")} /> : null}
          </TouchableOpacity>
          <Text style={{fontFamily:'Regular', fontSize:15, marginLeft:10}}>Male</Text>
          </View>

          <View style={{flexDirection:'row', width:'50%'}}>
          <TouchableOpacity  onPress={()=> setGender('female')} style={{width:25, height:25, borderColor:'#a7a7a7', borderWidth:2, justifyContent:'center', alignItems:'center'}}>
              {gender === 'female' ? <ImageComp onPress={()=> setGender('female')} Icon width={15} height={15} imageUri={require("../../assets/Icons/select.png")} /> : null}
          </TouchableOpacity>
          <Text style={{fontFamily:'Regular', fontSize:15, marginLeft:10}}>Female</Text>
          </View>
         

           
       
         
        </View>
        </View>
            </View>
          
          </View> */}

          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity
              disabled={!inputState.formisValid}
              // onPress={() => navigation.navigate("ClientDrawer")}
              onPress={clientRegistrationHandler}
              style={{
                width: "80%",
                height: 55,
                backgroundColor: !inputState.formisValid
                  ? "#a7a7a7"
                  : colors.Blue,

                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={20} color="white" />
              ) : (
                <Text style={{ fontSize: 17, color: "white" }}>REGISTER</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserInfo;
