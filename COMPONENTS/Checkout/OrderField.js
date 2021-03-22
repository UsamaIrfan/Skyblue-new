import React, { Component } from "react";
import { View, Text } from "react-native";
import {colors as Color} from '../../Constant'

const OrderField = props => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1
      }}
    >
      <Text style={{ fontSize: 18, color: "#484848" }}>{props.name}</Text>
      <Text style={{ fontSize: 18, color: Color.primary }}>{props.value}</Text>
    </View>
  );
};

export default OrderField;
