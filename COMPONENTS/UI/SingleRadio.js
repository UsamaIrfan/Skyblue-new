import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ImageComp from "./Image";
import {colors as Color, MaterialIcons} from "../../Constant";

const SingleRadio = props => {
  const fieldSelectHandler = selectedTime => {
    props.selectedTimeSlot(selectedTime);
  };

  return (
    <View
      style={{
        width: props.RadioRow ? "50%" : "100%",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={() => fieldSelectHandler(props.selectedTime)}
        style={{
          width: props.checkout ? 32 : 30,
          height: props.checkout ? 32 : 30,
          borderColor:
            props.selectedTime === props.whichTime ? Color.Blue : "#a7a7a7",
          borderWidth: 3,
          marginRight: 15,
          borderRadius: props.checkout ? 125 : null,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.selectedTime === props.whichTime ? (
          <MaterialIcons name="done" size={22} style={{}} color={Color.Blue} />
        ) : null}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: props.TermsCondition ? 16 : 18,
          color: "#484848",
          marginRight: 20
        }}
      >
        {props.selectedTime}
      </Text>
      {props.checkout ? (
        <ImageComp
          Icon
          width={props.width}
          height={props.height}
          imageUri={props.imageUri}
        />
      ) : null}
    </View>
  );
};

export default SingleRadio;
