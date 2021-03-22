import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const ImageComp = (props) => {
  let Comp = TouchableOpacity

  if(props.noPress) {
    Comp = View
  }
  return (
    <Comp
      onPress={props.onPress}
      style={[
        props.style,
        {
          width: props.width,

          height: props.height,
          marginTop: props.extraMargin ? props.extraMargin : null,
        },
      ]}
    >
      {props.isLoading ? (
        <ActivityIndicator size={26} color="#D2BBAA" />
      ) : (
        <Image
          source={props.imageUri}
          style={{
            width: null,
            height: null,
            borderRadius: props.circle ? 125 : null,
            flex: 1,
            resizeMode: props.Icon ? "contain" : "cover",
          }}
        />
      )}
    </Comp>
  );
};

export default ImageComp;
