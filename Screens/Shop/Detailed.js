import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Share,
  KeyboardAvoidingView,
} from "react-native";
// import Header from "../Components/Header";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useDispatch, useSelector } from "react-redux";
// import * as productAction from "../Redux/Action/Product";
// import * as cartAction from "../Redux/Action/cart";
// import Color from "../constant/color";
import { colors as Color, colors } from "../../Constant";
import Swiper from "react-native-swiper";
import Modal from "react-native-modal";
import * as cartActions from "../../Redux/Action/Cart";
import Loader from "../../COMPONENTS/Loader";
import {showSimpleMessage} from "../../Redux/Action/General"

const { width, height } = Dimensions.get("window");

const Detailed = (props) => {
  const [imageSlider, setImageSlider] = useState([
    require("../../assets/Images/slide1.jpg"),
    require("../../assets/Images/slide1.jpg"),
    require("../../assets/Images/slide1.jpg"),
  ]);
  const [isQuantity, setIsQuantity] = useState(false);
  const [quantity, setQuantity] = useState(props.route.params?.item?.AllowedQuantities[0]?.Value ? props.route.params?.item.AllowedQuantities[0].Value : 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);

  const userId = useSelector((state) => state.Auth.Login.customerId);
  const count = useSelector((state) => state.Cart.cartCount);

  let productSelect = props.route.params?.item;
  // console.log(productSelect.AlreadyInCart);
  // console.log(productSelect.DefaultPictureZoomEnabled);
  // console.log(productSelect.ProductPrice.ProductId);
  // console.log(productSelect.AllowedQuantities.length);
  const dispatch = useDispatch();

  // console.log(props.item.AllowedQuantities[0].Value)

  //   const products = useSelector(state => state.product.products);
  // ADD TO CART HANDLER
  const addToCardHandler = async () => {
    setIsLoading(true);

    console.log("USER: ", userId, "PRODUCT: ", productSelect.ProductPrice.ProductId, "QUANTITY: ", quantity)

    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/AddProductToCart?customerId=${userId}&productId=${productSelect.ProductPrice.ProductId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const resData = await response.json();
      console.log(resData);
      showSimpleMessage("success", {message: "Success.", description: "Product Added to Your Cart."})
      await dispatch(cartActions.fetchCountCart());
    } catch (err) {
      showSimpleMessage("warning", {message: "Unable To add Product to Cart.", description: `${err.message}`})
    }
    setIsLoading(false);
  };

  //   SHARE LOGIC
  //   share
  const copyToClipboard = () => {
    // Clipboard.setString(id);
    Share.share({
      title: "Share Product",
      message:
        "https://skybluewholesale.com/disposable-protective-face-mask-non-medical", // Note that according to the documentation at least one of "message" or "url" fields is required
      url:
        "https://skybluewholesale.com/disposable-protective-face-mask-non-medical",
      subject: "Subject",
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View
          style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
        >
          <ImageComp
            onPress={copyToClipboard}
            style={{ marginRight: 20 }}
            Icon
            width={23}
            height={23}
            imageUri={require("../../assets/Icons/share.png")}
          />
          <ImageComp
            onPress={() => props.navigation.navigate("Cart", {screen: "ViewCart"})}
            style={{ marginRight: 20 }}
            Icon
            width={26}
            height={26}
            imageUri={require("../../assets/Icons/cart.png")}
          />
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 125,
              backgroundColor: "white",
              position: "absolute",
              right: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "Regular", fontSize: 10 }}>{count}</Text>
          </View>
        </View>
      ),
    });
  }, [count]);

  const quantityHandler = useCallback(
    (quan) => {
      if (quan === "minus") {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      } else {
        setQuantity(quantity + 1);
      }
    },
    [quantity]
  );

  const setQuantityHandler = (item) => {
    setQuantity(item);
    setIsQuantity(false);
  };

  return (
    <View style={{ flex: 1, marginBottom: 60 }}>
      {/* Verification Code Modal */}
      <Modal
        style={{ margin: 0, marginBottom: 0 }}
        isVisible={isQuantity}
        deviceWidth={width}
        deviceHeight={height}
        // onBackdropPress={() => setIsVisible(false)}
        swipeDirection="down"
        // onSwipeComplete={() => setIsVisible(false)}
        // useNativeDriver={true}
        // hideModalContentWhileAnimating={true}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "75%",

              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                alignItems: "flex-end",
                marginTop: 10,
              }}
            >
              <ImageComp
                onPress={() => setIsQuantity(false)}
                width={22}
                height={22}
                imageUri={require("../../assets/Icons/cancel.png")}
              ></ImageComp>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
                Select Quantity
              </Text>
              <View
                style={{
                  width: "100%",
                  marginTop: 35,
                  alignItems: "center",
                }}
              >
                <View
                  style={{ width: "100%", marginBottom: 20, maxHeight: 350 }}
                >
                  <ScrollView>
                    {productSelect.AllowedQuantities.map((item) => (
                      <TouchableOpacity
                        onPress={() => setQuantityHandler(item.Value)}
                        key={item.Id}
                        style={{
                          width: "100%",
                          backgroundColor:
                            item.Value === quantity ? "#e5e5e5" : null,

                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,

                            color: "#747474",
                          }}
                        >
                          {item.Value}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View
          style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ height: width - 20, width: width }}>
            <Swiper style={styles.wrapper}>
              {productSelect.PictureModels.PictureModels.map((item, index) => (
                <View key={index} style={styles.slide1}>
                  <ImageComp
                    Icon
                    width={"100%"}
                    height={"100%"}
                    imageUri={{ uri: item.ImageUrl }}
                  />
                </View>
              ))}
            </Swiper>
          </View>
          <View
            style={{
              width: "90%",

              borderBottomWidth: 1,
              borderColor: "#e5e5e5",
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 21, color: "#484848" }}>
              {productSelect.Name}
            </Text>
            <Text style={{ fontSize: 16, color: "#AFAFAF", lineHeight: 30 }}>
              {productSelect.Name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: Color.primary,
                fontFamily: "Bold",
                marginTop: 10,
              }}
            >{`${productSelect.ProductPrice.Price}`}</Text>
          </View>
          <View style={{ width: "90%" }}>
            <Text style={{ fontSize: 16, color: "#AFAFAF", lineHeight: 22 }}>
              {productSelect.FullDescription}
            </Text>

            {isAdd === true ? (
              <View
                style={{
                  width: "100%",
                  height: 60,
                  backgroundColor: Color.primary,
                  position: "absolute",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color="white" />
                <Text style={{ color: "white", fontSize: 16, marginLeft: 20 }}>
                  ADDING TO CART
                </Text>
              </View>
            ) : null}

            {isAddSuccess === true ? (
              <TouchableOpacity
                onPress={() => setIsAddSuccess(false)}
                style={{
                  width: "100%",
                  height: 60,
                  backgroundColor: Color.primary,
                  position: "absolute",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageComp
                  width={16}
                  height={16}
                  imageUri={require("../../assets/Icons/isAddSuccess.png")}
                />

                <Text style={{ color: "white", fontSize: 16, marginLeft: 20 }}>
                  PRODUCT ADDED TO CART
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              width: "100%",
              height: 80,
              flex: 1,
              backgroundColor: Color.primary,
              // backgroundColor: "green",
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {productSelect.AllowedQuantities.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.Blue,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  borderRadius: 125,
                }}
              >
                <TextInput
                  placeholder="Enter Quantity"
                  style={{
                    color: "#fff",
                    flex: 1,
                    height: "100%",
                    fontSize: width * 0.03,
                    fontFamily: "Regular"
                  }}
                  keyboardType="number-pad"
                  placeholderTextColor="#fff"
                  value={quantity}
                  onChangeText={(text) => setQuantity(text)}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsQuantity(true)}
                style={{
                  flex: 1,
                  backgroundColor: colors.Blue,
                  paddingVertical: 28,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  borderRadius: 125,
                }}
              >
                <Text style={{ color: "white", fontSize: 19 }}>{quantity}</Text>
                <ImageComp
                  onPress={() => quantityHandler("minus")}
                  Icon
                  imageUri={require("../../assets/Icons/dropdownWhite.png")}
                  width={13}
                  height={13}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              // onPress={()=> props.navigation.navigate('Bag')}
              onPress={addToCardHandler}
              style={{
                flex: 2,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                marginLeft: 10,
                borderRadius: 125,

                borderWidth: 2,
                borderColor: colors.Blue,
              }}
            >
              {isAdd ? (
                <ActivityIndicator color="white" size={16} />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    color: colors.Blue,
                    fontFamily: "Bold",
                  }}
                >
                  {productSelect.AlreadyInCart
                    ? "Already In Cart"
                    : "ADD TO CART"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <Loader />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Detailed;
