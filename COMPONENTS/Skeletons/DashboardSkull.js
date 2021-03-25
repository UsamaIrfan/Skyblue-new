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
        speed={1}
      >
        <View>
            <Rect x={"0"} y="0" rx="5" ry="5" width={width} height="100" />
            <Rect x={"25"} y="130" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 3 + 20} y="130" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 1.5 + 15} y="130" rx="5" ry="5" width={width / 4} height="80" />
        </View>
        
        <View>
            <Rect x={"25"} y="230" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 3 + 20} y="230" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 1.5 + 15} y="230" rx="5" ry="5" width={width / 4} height="80" />
        </View>

        <View>
            <Rect x={"25"} y="330" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 3 + 20} y="330" rx="5" ry="5" width={width / 4} height="80" />
            <Rect x={width / 1.5 + 15} y="330" rx="5" ry="5" width={width / 4} height="80" />
        </View>

        <View>
            <Rect x={"20"} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={"20"} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={"20"} y="610" rx="5" ry="5" width={width / 3} height="20" />
            <Rect x={width / 2 + 10} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width / 2 + 10} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width / 2 + 10} y="610" rx="5" ry="5" width={width / 3} height="20" />
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
