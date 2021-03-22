import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import ImageComp from "../../";
import { useSelector, useDispatch } from "react-redux";
// import * as addressAction from "../../Redux/Action/Address";
import CartProductRow from "../../COMPONENTS/Checkout/CartProductRow";
import SingleRadio from "../../COMPONENTS/UI/SingleRadio";
// import * as cartAction from "../../Redux/Action/cart";
import {colors as Color} from "../../Constant";
import SuccessScreen from '../../COMPONENTS/UI/SuccessScreen'

const Checkout = (props) => {
 

  const [payment, setPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([
    { method: "Credit Card" },
    { method: "Debit Card" },
    { method: "Cash on delivery" },
  ]);
  const [isTerms, setIsTerms] = useState();
  const [subTotal, setSubTotal] = useState();
  const [isOrderConfirm, setOrderConfirm] = useState(false);
  const [customerName, setCustomerName] = useState('')

  const products = useSelector((state) => state.Cart.cart);
  const userId = useSelector((state) => state.Auth.Login.customerId);




//   const addresses = useSelector((state) => state.address.address);
//   const selectedAddressOne = addresses.filter(
//     (item) => item.id === selectedAddress[0].id
//   );

  const setPaymentHandler = (paymentSet) => {
    setPayment(payment === paymentSet ? "" : paymentSet);
  };
  const termsSetHandler = (paymentSet) => {
    setIsTerms(isTerms === paymentSet ? "" : paymentSet);
  };

  const dispatch = useDispatch();

//   const fetchAddressData = useCallback(async () => {
//     setIsLoading(true);
//     await dispatch(addressAction.fetchAddress());
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     fetchAddressData();
//   }, []);

//   useEffect(() => {
//     const willFocusSub = props.navigation.addListener(
//       "willFocus",
//       fetchAddressData
//     );
//     console.log("i m running third");

//     return () => {
//       willFocusSub.remove();
//     };
//   }, [fetchAddressData]);
  // useEffect(() => {
  //   let subTotal = 0;
  //   for (let key in products) {
  //     subTotal = subTotal + products[key].price * products[key].quanity;
  //   }
  //   setSubTotal(subTotal);
  // }, []);

  const proceedCheckoutHandler = async () => {
    if (isTerms) {
      // id,
      //   deliveryAddress,
      //   deliveryDate,
      //   deliveryTime,
      //   giftMessage,
      //   extraInformation,
      //   cartProducts,
      //   paymentMethod,
      //   totalAmount;

      setOrderConfirm(false);
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://skybluewholesale.com:80/api/CatalogApi/OpcConfirmOrder?customerId=${userId}`,
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
        setCustomerName(resData.CustomerName)
      } catch (err) {
        Alert.alert('Something went wrong!', err.message);
      }
      setIsLoading(false);
      setOrderConfirm(true);
    } else {
      Alert.alert(
        "ACCEPT CONDITIONS",
        "You must accept the terms & conditions to proceed this order",
        [{ text: "Okay" }]
      );
    }
  };

  // if (isOrderConfirm === true) {
  //   return (
  //     <EmptyScreen
  //       imageUri={require("../../assets/Home/CHECKOUT/confirm.png")}
  //       title="AHMED BELLO,
  //       THANK YOU FOR YOUR ORDER!"
  //       description="You will receive a confirmation email
  //       with the details of your order."
  //     />
  //   );
  // }
  if (isLoading === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={55} color={Color.primary} />
        <Text>Please wait..</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
  
      {isOrderConfirm === true ? (
        <SuccessScreen
        checkout
          width={250}
          height={250}
          onPress={() => props.navigation.navigate("Home")}
          imageUrl={require("../../assets/Icons/confirm.png")}
          title={`${customerName}, THANK YOU FOR YOUR ORDER!`}
          description="You will receive a confirmation email 
        with the details of your order."
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              Please review and confirm your order details
            </Text>

            
            {/* Checkout Products start here */}
            <View
              style={{
                width: "100%",

                borderBottomWidth: 1,

                borderColor: "#e5e5e5",
                paddingTop: 10,

                paddingHorizontal: 5,
              }}
            >
              {products.Items.map((item) => {
                return (
                  <CartProductRow
                    key={item.Id}
                    title={item.ProductName}
                    imageUrl={{ uri: item.Picture.ImageUrl }}
                    price={item.SubTotal}
                    quantity={item.Quantity}
                    checkout
                    id={item.id}
                  />
                );
              })}
            </View>

            

            {/* TRANSACTION METHOD */}
            <View
              style={{
                width: "100%",

                paddingVertical: 20,
                paddingHorizontal: 12,
              }}
            >
              <Text style={{ fontSize: 19, marginBottom: 15 }}>
                TRANSACTION SUMMARY
              </Text>

              {/* subtotal */}
              <View
                style={{
                  width: "100%",

                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 16, color: "#AFAFAF" }}>
                    Subtotal
                  </Text>
                </View>
                <View style={{ flex: 2, alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 16, color: "#484848" }}>
                    {products.OrderTotals.OrderTotal}
                  </Text>
                </View>
              </View>
              {/* Delivery Free */}
              <View
                style={{
                  width: "100%",

                  paddingTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 16, color: "#AFAFAF" }}>
                    Delivery Fee
                  </Text>
                </View>
                <View style={{ flex: 2, alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 16, color: "#484848" }}>
                    {products.OrderTotals.Shipping}
                  </Text>
                </View>
              </View>

              {/* Total */}
              <View
                style={{
                  width: "100%",

                  paddingTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 18, color: "#484848", fontFamily:'Bold' }}>Total</Text>
                </View>
                <View style={{ flex: 2, alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 18, color: "#484848", fontFamily:'Bold' }}>
                    {products.OrderTotals.OrderTotal}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 2, backgroundColor: "#e5e5e5" }}
            ></View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <SingleRadio
                TermsCondition="Terms"
                selectedTime="I have read and agree to the Terms & Conditions"
                whichTime={isTerms}
                selectedTimeSlot={termsSetHandler}
              />
            </View>

            <TouchableOpacity

              onPress={proceedCheckoutHandler}
              style={{
                width: "80%",
                height: 60,
                backgroundColor: Color.Blue,
                justifyContent: "center",
                alignItems: "center",
                borderRadius:125,
                marginBottom:15
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>CONFIRM ORDER</Text>
            </TouchableOpacity>
          </View>
          {/* body View exclude header ends here */}
        </ScrollView>
      )}
    </View>
  );
};

export default Checkout;
