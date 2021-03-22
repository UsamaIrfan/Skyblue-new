import React, { useReducer, useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, KeyboardAvoidingView,I18nManager } from "react-native";
import ImageComp from "../UI/Image";

const FIELD_CHANGE_HANDLER = "FIELD_CHANGE_HANDLER";
const LOST_FOCUS = "LOST_FOCUS";
const filedReducer = (state, action) => {
  switch (action.type) {
    case FIELD_CHANGE_HANDLER:
      //  console.log(action.value);
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
const InputDesp = (props) => {
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [inputState, fieldDispatch] = useReducer(filedReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: false,
    touched: false,
  });

  const inputChangeHandler = (text) => {
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
  };

  const { id, inputFieldHandler } = props;
  useEffect(() => {
    inputFieldHandler(inputState.value, inputState.isValid, id);
  }, [inputState, inputFieldHandler]);

  const onLostFocus = () => {
    setIsFieldFocused(false);
    console.log("i called");
    fieldDispatch({ type: LOST_FOCUS });
  };

  const fieldFocusHandler = () => {
    setIsFieldFocused(true);
  };

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 5,
        marginBottom: 7,
        height: 200,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",

            borderWidth: 2,
            borderColor: "#e5e5e5",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "85%",
            height: 200,
          }}
        >
          <TextInput
            secureTextEntry={props.password}
            keyboardType={props.KeyboardType}
            onFocus={fieldFocusHandler}
            {...props}
            onChangeText={inputChangeHandler}
            value={inputState.value}
            onBlur={onLostFocus}
            multiline={true}
            style={{
              width: "90%",
              paddingVertical: 7,
              fontSize: 17,
              textAlign: I18nManager.isRTL ? "right" :"left",

              color: props.disable ? "#a7a7a7" : "#484848",
              fontSize: 16,
            }}
          ></TextInput>
        </View>
        <View style={{ width: "85%" }}>
          {!inputState.value && inputState.touched && props.required && (
            <Text style={{ color: "red" }}>{props.errorMessage}</Text>
          )}
          {inputState.value &&
          inputState.touched &&
          inputState.isValid === false ? (
            <Text style={{ color: "red" }}>Email is Invalid</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default InputDesp;
