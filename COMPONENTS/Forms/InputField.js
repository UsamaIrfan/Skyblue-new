import React, {
  useReducer,
  useState,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  I18nManager,
  StyleSheet,
} from "react-native";
import ImageComp from "../UI/Image";
import { colors } from "../../Constant";

const FIELD_CHANGE_HANDLER = "FIELD_CHANGE_HANDLER";
const LOST_FOCUS = "LOST_FOCUS";
const filedReducer = (state, action) => {
  switch (action.type) {
    case FIELD_CHANGE_HANDLER:
   
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case LOST_FOCUS:
      return {
        ...state,
        touched: true,
      };
  }
  return state;
};
const Input = forwardRef((props, ref) => {
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  // const [inputs, setInputs] = useState({});
  const [counter, setCounter] = useState(0);
  const [inputState, fieldDispatch] = useReducer(filedReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValue ? true : false,
    touched: false,
  });

  const inputChangeHandler = useCallback(
    (text) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
      let isValid = true;
      if (props.required && text.trim().length === 0) {
        isValid = false;
      }
      if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
      }
      if (props.website && !websiteRegex.test(text.toLowerCase())) {
        isValid = false;
      }
      if (props.min != null && +text < props.min) {
        isValid = false;
      }
      if (props.max != null && +text > props.max) {
        isValid = false;
      }
      if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
      }

      fieldDispatch({
        type: FIELD_CHANGE_HANDLER,
        value: text,
        isValid: isValid,
      });
      inputSetHandler(text, isValid);
    },
    [inputChangeHandler]
  );



  const { id, inputFieldHandler } = props;
  const inputSetHandler = (value, isValid) => {
    inputFieldHandler(value, isValid, id);
  
  };

  // useEffect(() => {
  //   if (inputState.touched) {
  //     inputFieldHandler(inputState.value, inputState.isValid, id);
  //     console.log("im running");
  //   }
  // }, [inputFieldHandler, inputState, counter]);

  const onLostFocus = () => {
    setIsFieldFocused(false);
   
    fieldDispatch({ type: LOST_FOCUS });
  };

  const fieldFocusHandler = () => {
    setIsFieldFocused(true);
  };

  return (
    <View style={{ width: "100%", paddingVertical: 5, marginBottom: 7 }}>
      <View style={{ marginLeft: 16 }}>
        {props.Login ? (
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
              {props.Label}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: "90%",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 13,
                color: colors.Grey,
                letterSpacing: 0.6,
                paddingLeft: props.Login ? 40 : 15,
                fontFamily: "Regular",
              }}
            >
              {props.Label}
            </Text>
          </View>
        )}
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",

            borderBottomWidth: 2,
            borderBottomColor: isFieldFocused ? "green" : "#e5e5e5",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "90%",
          }}
        >
          {props.Login ? (
            <ImageComp Icon width={20} height={20} imageUri={props.imageUri} />
          ) : null}
          <TextInput
            placeholder={null}
            secureTextEntry={props.password}
            keyboardType={props.KeyboardType}
            onFocus={fieldFocusHandler}
            {...props}
            ref={ref}
            onChangeText={inputChangeHandler}
            // autoFocus={true}
            returnKeyType={props.done ? 'done':"next"}
            value={inputState.value}
            onBlur={onLostFocus}
            style={{
              width: props.Login ? "90%" : "100%",
              paddingVertical: 7,
              fontSize: 17,
              textAlign: I18nManager.isRTL ? "right" : "left",

              color: props.disable ? colors.Grey : colors.Black,

              paddingLeft: props.Login || !I18nManager.isRTL ? 15 : null,
              fontSize: 16,
              fontFamily: "Regular",
              letterSpacing: 0.5,
            }}
          ></TextInput>
        </View>
        <View style={{ width: "85%" }}>
          {!inputState.value && inputState.touched && props.required && (
            <Text style={{ color: "red" }}>*Required</Text>
          )}
          {inputState.value && inputState.isValid === false ? (
            <Text style={{ color: "red" }}>Invalid data</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  textvalid: {
    borderWidth: 2,
  },
  textinvalid: {
    borderColor: "red",
  },
});

export default Input;
