import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../Constant";

import React from "react";

import { View } from "react-native";
import ImageComp from "../COMPONENTS/UI/Image";
import ViewCart from "../Screens/Checkout/ViewCart";
import Checkout from "../Screens/Checkout/Checkout";

// HOME STACK NAVIGATOR
const CheckoutNavigator = createStackNavigator();

export const CheckoutNavigatorFunc = () => {
  return (
    <CheckoutNavigator.Navigator
      // initialRouteName="PriceOffer
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Bold",
          fontSize: 17,
          letterSpacing: 1,
        },
        headerStyle: {
          backgroundColor: colors.Blue,
        },

        headerTintColor: "white",
        headerTitle: "CATEGORIES",
      }}
    >
      <CheckoutNavigator.Screen
        name="ViewCart"
        component={ViewCart}
        options={({ navigation }) => ({
          headerTitle: "BAG",
          headerLeft: () => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: "70%",
                  paddingLeft: 15,

                  justifyContent: "flex-end",
                }}
              ></View>
              <ImageComp
                onPress={() =>
                  navigation.navigate("Home", { screen: "BarCode" })
                }
                Icon
                width={27}
                height={27}
                imageUri={require("../assets/Icons/qr-code.png")}
              />
            </View>
          ),
        })}
      />
      <CheckoutNavigator.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerTitle: "Checkout" }}
      />
    </CheckoutNavigator.Navigator>
  );
};

// HOME STACK NAVIGATOR ENDS HERE
