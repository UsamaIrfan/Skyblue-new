import React, { useState, useCallback, useEffect, isValidElement } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  TextInput,
} from "react-native";

import ImageComp from "../../COMPONENTS/UI/Image";
import CartProductRow from "../../COMPONENTS/Checkout/CartProductRow";
import { colors as Color, colors, MaterialIcons } from "../../Constant";
import { useIsFocused } from "@react-navigation/native";
import SuccessScreen from "../../COMPONENTS/UI/SuccessScreen";
import * as cartAction from "../../Redux/Action/Cart";
import { useDispatch, useSelector } from "react-redux";
import ProductSkull from "../../COMPONENTS/Skeletons/CheckSkull";
import { showSimpleMessage } from "../../Redux/Action/General";
import HideWithKeyboard from "react-native-hide-with-keyboard";
// import EmptyScreen from "../../Components/UI/EmptyScreen";
// import { isDate } from "moment";

const { width, height } = Dimensions.get("window");

const ViewCart = (props) => {
  const [subTotalPrice, setSubtotalPrice] = useState(0);

  const [isQuantityAdd, setQuantityAdd] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [itemQuantities, setItemQuantities] = useState([]);
  const [updateAmount, setupdateAmount] = useState(null);
  const [selectedProduct, setselectedProduct] = useState(null);
  const [IsAmountUpdated, setIsAmountUpdated] = useState(false);

  const cartProducts = useSelector((state) => state.Cart.cart);
  console.log(cartProducts.Items);
  const userId = useSelector((state) => state.Auth.Login.customerId);
  const isFocused = useIsFocused();

  // FETCH CART DATA
  const dispatch = useDispatch();

  const subTotalHandler = useCallback(() => {
    let subtotal = 0;
    for (let key in cartProducts.Items) {
      subtotal = subtotal + cartProducts.Items[key].SubTotal;
    }
    setSubtotalPrice(subtotal);
  }, [isFetch]);

  useEffect(() => {
    subTotalHandler();
  }, [isFetch]);

  const fetchViewCartData = useCallback(async () => {
    // setCount(count + 1);

    setIsFetch(true);

    await dispatch(cartAction.fetchCartData());

    setIsFetch(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchViewCartData().then(() => {
      setIsLoading(false);
    });
  }, [isDelete, isQuantityAdd, isFocused, IsAmountUpdated]);

  // ADD TO CART HANDLER
  const cartAllItemsHandler = async () => {
    setIsLoading(true);
    setIsDelete(true);

    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/RemoveAllItemsFromCart?customerId=${userId}`,
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
      Alert.alert(
        "Successfully Removed",
        "Successfully removed all items from cart"
      );
    } catch (err) {
      Alert.alert("Something went wrong!", err.message);
    }
    setIsDelete(false);
    setIsLoading(false);
  };

  // UPDATE TO CART HANDLER
  const updateAmountHandler = async (updateAmount) => {
    setIsModal(false);
    setIsLoading(true);

    console.log(
      "USER: ",
      userId,
      "ITEM: ",
      selectedProduct,
      "AMOUNT: ",
      updateAmount
    );

    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/AddProductToCart?customerId=${userId}&productId=${selectedProduct}&quantity=${updateAmount}`,
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
      showSimpleMessage("success", {
        message: "Success.",
        description: "Product Added to Your Cart.",
      });
      // await dispatch(cartActions.fetchCountCart());
    } catch (err) {
      showSimpleMessage("warning", {
        message: "Unable To add Product to Cart.",
        description: `${err.message}`,
      });
    }
    setIsLoading(false);

    setIsLoading(true);
    fetchViewCartData()
      .then(() => {
        showSimpleMessage("success", {
          message: "Cart Updated",
          description: "Cart Updated Successfully.",
        });

        setIsLoading(false);
      })
      .catch(() => {
        showSimpleMessage("warning", {
          message: "Failed To Update Cart",
          description: "Failed.",
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={cartAllItemsHandler}
          style={{
            width: 100,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Regular",
              color: "white",
              fontSize: 14,
              letterSpacing: 2,
            }}
          >
            CLEAR
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const quantityAmountHandler = useCallback(
    async (quan, pId) => {
      const selectedProduct = cartProducts.filter((item) => item.id === pId);
      // console.log(selectedProduct);
      // console.log(cartProducts);
      setQuantityAdd(true);
      if (selectedProduct.length !== 0 && selectedProduct[0].id !== null) {
        const {
          id,
          title,
          imageUrl,
          discountPrice,
          prodId,
          price,
        } = selectedProduct[0];

        await dispatch(
          cartAction.addToCartUpdate(
            id,
            prodId,
            title,
            imageUrl,
            price,
            discountPrice,
            quan
          )
        );
      }
      setQuantityAdd(false);
    },
    [isFetch]
  );

  const deleteHandler = useCallback(async (cId) => {
    setIsDelete(true);
    await dispatch(cartAction.deleteCart(cId));
    setIsDelete(false);
  }, []);
  if (isFetch === true) {
    return <ProductSkull />;
  }

  const ModalDataHandler = (quantity, itemID) => {
    setselectedProduct(itemID);
    setItemQuantities(quantity);
    setIsModal(true);
  };

  return (
    <View style={{ flex: 1, marginBottom: 60 }}>
      {isLoading === true ? (
        <ProductSkull />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{}}>
            <Modal
              // isVisible={isModal}
              visible={isModal}
              // deviceWidth={width}
              // deviceHeight={height}
              transparent={true}
              onBackdropPress={() => setIsModal(false)}
              swipeDirection="down"
              onSwipeComplete={() => setIsModal(false)}
              useNativeDriver={true}
              hideModalContentWhileAnimating={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
                    <MaterialIcons
                      onPress={() => setIsModal(false)}
                      name="cancel"
                      size={24}
                      color={Color.Blue}
                    />
                  </View>
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
                      Enter Quantity
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 35,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 20,
                          maxHeight: 350,
                        }}
                      >
                        <ScrollView>
                          {itemQuantities.length === 0 ? (
                            <View>
                              <TextInput
                                placeholder="Add to your existing quantity"
                                keyboardType="number-pad"
                                returnKeyType="done"
                                autoFocus
                                value={updateAmount}
                                style={{
                                  width: "100%",
                                  fontFamily: "Regular",
                                  borderRadius: 8,
                                  borderColor: Color.Blue,
                                  borderWidth: 2,
                                  paddingVertical: 3,
                                  paddingHorizontal: 5,
                                }}
                                onChangeText={setupdateAmount}
                                onSubmitEditing={() => {
                                  updateAmountHandler(updateAmount);
                                }}
                              />
                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                  updateAmountHandler(updateAmount);
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    marginTop: 10,
                                    marginHorizontal: "30%",
                                    borderRadius: 8,
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    fontSize: 17,
                                    backgroundColor: Color.Blue,
                                    color: "#fff",
                                  }}
                                >
                                  Update
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            itemQuantities.map((item, indx) => (
                              <TouchableOpacity
                                onPress={() => {
                                  updateAmountHandler(item.Value);
                                }}
                                key={indx}
                                style={{
                                  width: "100%",
                                  // backgroundColor:
                                  //   item.Value === quantity ? "#e5e5e5" : null,

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
                            ))
                          )}
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          {cartProducts.Items?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SuccessScreen
                widthNeed
                width={200}
                height={200}
                //   onPress={() => props.navigation.navigate("Home")}
                imageUrl={require("../../assets/Icons/confirm.png")}
                title="EMPTY BAG"
                description="Looks like you haven't made your choice yet."
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,

                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "100%", flex: 1 }}>
                <FlatList
                  data={cartProducts.Items}
                  keyExtractor={(item, index) => item.Id.toString()}
                  renderItem={(itemData) => (
                    <CartProductRow
                      cancel
                      checkout
                      navigation={props.navigation}
                      title={itemData.item.ProductName}
                      imageUrl={{ uri: itemData.item.Picture.ImageUrl }}
                      price={itemData.item.SubTotal}
                      quantity={itemData.item.Quantity}
                      onPressCancel={() => deleteHandler(itemData.item.Id)}
                      onPressModal={() => setIsModal(true)}
                      id={itemData.item.ProductId}
                      quantityReturnBack={quantityAmountHandler}
                      allowedQuantities={itemData.item.AllowedQuantities}
                      setItemQuantities={setItemQuantities}
                      ModalDataHandler={ModalDataHandler}
                    />
                  )}
                />
              </View>

              <View
                style={{
                  width: "100%",

                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "100%", paddingHorizontal: 15 }}>
                  <View
                    style={{
                      width: "100%",

                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Subtotal</Text>
                    <Text style={{ fontSize: 18 }}>
                      {cartProducts.OrderTotals.OrderTotal}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      borderColor: "#e5e5e5",

                      borderBottomWidth: 1,
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Shipping</Text>
                    <Text style={{ fontSize: 18 }}>
                      {cartProducts.OrderTotals.Shipping}
                    </Text>
                  </View>
                </View>
                <HideWithKeyboard>
                  <View
                    style={{
                      width: "100%",
                      paddingVertical: 15,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Checkout")}
                      style={{
                        width: "80%",
                        height: 50,
                        backgroundColor: Color.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 125,
                        backgroundColor: colors.Blue,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {cartProducts.OrderTotals.OrderTotal} - CHECKOUT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </HideWithKeyboard>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ViewCart;
