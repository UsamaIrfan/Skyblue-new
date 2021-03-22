import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {colors as Color} from "../../Constant";

const SuccessScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30
      }}
    >
      <View
        style={{
          width: props.checkout || props.widthNeed ? props.width : 100,
          height: props.checkout || props.widthNeed ? props.width : 100,

        }}
      >
        <Image
          source={props.imageUrl}
          style={{
            width: null,
            height: null,
            flex: 1,
            resizeMode: "contain"
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 21,
          color: "#484848",
          fontWeight: "100",
          marginBottom: 10,
          textAlign: "center"
        }}
      >
        {props.title}
      </Text>
      {props.address ? (
        <TouchableOpacity onPress={props.onPress}>
          <Text style={{ fontSize: 20, color: "#AFAFAF", textAlign: "center" }}>
            {props.description}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ fontSize: 18, color: "#AFAFAF", textAlign: "center" }}>
          {props.description}
        </Text>
      )}

      {props.checkout ? (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            width: "80%",
            height: 60,
            backgroundColor: Color.Blue,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius:125
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>PROCEED</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SuccessScreen;
