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
            <Rect x={width * 0.035} y="60" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width * 0.035} y="170" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width * 0.035} y="210" rx="5" ry="5" width={width / 3} height="20" />
            <Rect x={width / 2 + 10} y="60" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width / 2 + 10} y="170" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width / 2 + 10} y="210" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        
        <View>
            <Rect x={width * 0.035} y="260" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width * 0.035} y="370" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width * 0.035} y="410" rx="5" ry="5" width={width / 3} height="20" />
            <Rect x={width / 2 + 10} y="260" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width / 2 + 10} y="370" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width / 2 + 10} y="410" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        
        <View>
            <Rect x={width * 0.035} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width * 0.035} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width * 0.035} y="610" rx="5" ry="5" width={width / 3} height="20" />
            <Rect x={width / 2 + 10} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width / 2 + 10} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width / 2 + 10} y="610" rx="5" ry="5" width={width / 3} height="20" />
        </View>
      </ContentLoader>
    </View>
  );
};

export default ProductSkull;

const styles = StyleSheet.create({});
