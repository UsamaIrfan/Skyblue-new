import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { colors } from "../../Constant";
import { ImageComp } from "../UI/Image";

const { width, height } = Dimensions.get("window");

const ProductListing = (props) => {
  // const [isFav, setIsFav] = useState({});

  // const dispatch = useDispatch();
  // const FavHandler = useCallback(
  //   prod => {
  //     // setIsFav({ ...isFav, [index]: isFav[index] === true ? false : true });
  //     // console.log(isFav);
  //     console.log(prod);
  //     let isFav = prod.isFav === true ? false : true;

  //     dispatch(productAction.addToFavourite(prod, isFav));
  //     props.reFetch();
  //   },
  //   [dispatch]
  // );
  console.log("Image URI ==>", props.imageUri.uri);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: width / 2.5,
        marginBottom: 20,
        // marginRight: props.Listing ? 0 : 20,
        maxHeight: 300,
        minHeight: 280,
        borderRadius: 10,
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={0.5}
        style={{
          maxHeight: 190,
          padding: 5,
          width: "100%",
          height: width / 2.5,
          flex: 1,
          backgroundColor: "white",
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            width: null,
            height: null,
            resizeMode: "contain",
            flex: 1,
          }}
          source={{ uri: props.imageUri.uri }}
        />
        {/* <TouchableOpacity
        //   onPress={() => FavHandler(props.prod)}
          style={{
            position: "absolute",
            width: 27,
            height: 27,
            right: 10,
            top: 10
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain"
            }}
            source={
              props.isFav === true
                ? require("../../assets/Home/heart_filled.png")
                : require("../../assets/Home/heart_unfilled.png")
            }
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
      <View
        style={{
          paddingBottom: 5,
          paddingHorizontal: 5,
          alignItems: "flex-start",
          marginTop: 15,
          paddingRight: 10,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,

            marginBottom: 7,
            color: colors.Blue,
            fontFamily: "Regular",
            lineHeight: 18,
            fontWeight: "bold",
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: "#a7a7a7",
            fontSize: 14,
            marginTop: 3,
            marginBottom: 3,
            fontFamily: "Regular",
          }}
        >
          {props.description}
        </Text>

        <View
          style={{
            flexDirection: "row",

            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: colors.primary,
              marginRight: 8,
              fontFamily: "Bold",
            }}
          >
            {props.price}
          </Text>
          <TouchableOpacity onPress={props.onPressSec}>
            <Image
              style={{
                width: props.widthSec,
                height: props.heightSec,
                resizeMode: "contain",
                flex: 1,
              }}
              source={props.imageUriSec}
            />
          </TouchableOpacity>

          {props.discount ? (
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: "#A7A7A7",
              }}
            >
              {props.discount}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ProductListing;
