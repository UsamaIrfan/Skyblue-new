import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { colors, Feather, Entypo } from "../../Constant";
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
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: width / 2.2,
        marginBottom: 20,
        // marginRight: props.Listing ? 0 : 20,
        maxHeight: 310,
        minHeight: 280,
        marginHorizontal: 5,
        borderRadius: 17,
        overflow: "hidden",
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
            margin: 5,
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
            marginBottom: 7,
            color: "#000",
            fontFamily: "Regular",
            lineHeight: 18,
            fontWeight: "bold",
            fontSize: 16,
            maxHeight: 17,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: "#a7a7a7",
            fontSize: 14,
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
            paddingBottom: 5,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: colors.Blue,
                fontSize: 15,
                fontWeight: "bold",
                color: "#fff",
                paddingVertical: 2,
                borderRadius: 10,
                paddingHorizontal: 5,
                marginRight: 8,
                fontFamily: "Bold",
              }}
            >
              {!props.item?.ProductPrice?.HidePrices && props.price}
            </Text>

            <View
              style={{
                position: "relative",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 1,
                  width: "110%",
                  backgroundColor: "#A7A7A7",
                  position: "absolute",
                  top: "40%",
                }}
              ></View>
              {props.item?.ProductPrice?.OldPrice && (
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#A7A7A7",
                  }}
                >
                  {props.item?.ProductPrice?.OldPrice}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={props.onPressSec}>
          <Feather name="shopping-bag" size={24} color={colors.Blue} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductListing;
