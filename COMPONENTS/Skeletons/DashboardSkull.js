import React, { useEffect, useState } from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { colors } from "../../Constant";

const ProductSkull = () => {
  const { height, width } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 , alignItems: "center"}}>
      <ContentLoader
        backgroundColor="#ccc"
        foregroundColor={colors.Blue}
        fillOpacity={0.5}
        speed={1}
      >
        <View>
            <Rect x={"0"} y="0" rx="5" ry="5" width={width} height="100" />
            <Rect x={width * 0.06} y="130" rx="5" ry="5" width={width / 2.5} height="130" />
            <Rect x={width / 2 + 20} y="130" rx="5" ry="5" width={width / 2.5} height="130" />
        </View>
        
        <View>
            <Rect x={width * 0.06} y="290" rx="5" ry="5" width={width / 2.5} height="130" />
            <Rect x={width / 2 + 20} y="290" rx="5" ry="5" width={width / 2.5} height="130" />
        </View>

        <View>
            <Rect x={width * 0.06} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width * 0.06} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width * 0.06} y="610" rx="5" ry="5" width={width / 3} height="20" />
            <Rect x={width / 2 + 20} y="460" rx="5" ry="5" width={width / 2.4} height="100" />
            <Rect x={width / 2 + 20} y="570" rx="5" ry="5" width={width / 2.4} height="30" />
            <Rect x={width / 2 + 20} y="610" rx="5" ry="5" width={width / 3} height="20" />
        </View>
        
        <View>
            <Rect x={'0'} y={height - 50} rx="5" ry="5" width={width} height="100" />
        </View>
      </ContentLoader>
        <Text style={{fontSize: 11, color: "#000", fontFamily: "Regular", position: "absolute", bottom: 0, zIndex: 99999999999,}} >V .1.0.0</Text>
    </View>
  );
};

export default ProductSkull;

const styles = StyleSheet.create({});
