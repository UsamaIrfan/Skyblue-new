import React, { useEffect, useState } from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ColorPropType,
} from "react-native";
import { colors } from "../../Constant";

const ProductSkull = () => {
  const { height, width } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 }}>
      <ContentLoader
        backgroundColor="#ccc"
        foregroundColor={colors.Blue}
        fillOpacity={0.5}
        speed={1}
      >
        <View>
            <Rect x={"30"} y="60" rx="5" ry="5" width={width - 50} height="100" />
            <Rect x={"30"} y="170" rx="5" ry="5" width={width - 50} height="30" />
            <Rect x={"30"} y="210" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        
        <View>
            <Rect x={"30"} y="260" rx="5" ry="5" width={width - 50} height="100" />
            <Rect x={"30"} y="370" rx="5" ry="5" width={width - 50} height="30" />
            <Rect x={"30"} y="410" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        
        <View>
            <Rect x={"30"} y="460" rx="5" ry="5" width={width - 50} height="100" />
            <Rect x={"30"} y="570" rx="5" ry="5" width={width - 50} height="30" />
            <Rect x={"30"} y="610" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        {/* <View>
            <Rect x={"40"} y="300" rx="5" ry="5" width={width / 3} height="200" />
            <Rect x={width / 2 + 30} y="300" rx="5" ry="5" width={width / 3} height="200" />
        </View> */}
        {/* <Rect x="20" y="320" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="20" y="380" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="20" y="440" rx="5" ry="5" width={width - 40} height="50" />
          <Rect x="0" y={height - 60} rx="0" ry="0" width={width} height="50" /> */}
      </ContentLoader>
    </View>
  );
};

export default ProductSkull;

const styles = StyleSheet.create({});
