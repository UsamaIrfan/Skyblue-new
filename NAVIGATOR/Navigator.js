// DEFAULTS IMPORTS
import React from "react";
import { View, Text } from "react-native";
import ImageComp from "../COMPONENTS/UI/Image";
import * as tabFunc from "../COMPONENTS/TabComponent";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

// IMPORTS OF ALL NAVIGATIONS
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSwitchNavigator } from "react-navigation";
import { NavigationActions, StackActions } from "react-navigation";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Home" })],
  key: null,
});

// IMPORTS OF NAVIGATION ENDS HERE

// NAVIGATORS
import { ShopNavigatorFunc } from "../NAVIGATOR/ShopNavigator";

// Screens Imports
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import { colors } from "../Constant";
import Home from "../Screens/Home/Home";
import { CheckoutNavigatorFunc } from "./CheckoutNavigator";
import { AccountNavigatorFunc } from "./AccountNavigator";
import barCode from "../Screens/Home/BarCode";
import StartupScreen from "../Screens/Startup";
import { useState } from "react/cjs/react.development";
import { useSelector } from "react-redux";

// BELOW IS THE MAIN STACK NAVIGATOR

const mainStack = createStackNavigator();

const mainNavigator = () => {
  return (
    <NavigationContainer>
      <mainStack.Navigator
      // initialRouteName="PriceOffer
      >
        <mainStack.Screen
          name="Startup"
          component={StartupScreen}
          options={{ headerShown: false }}
        />
        <mainStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <mainStack.Screen
          name="Register"
          component={Register}
          options={{
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
            headerTitle: "REGISTER",
          }}
        />
        <mainStack.Screen
          name="Home"
          component={MainTabFunc}
          options={{ headerShown: false }}
        />
      </mainStack.Navigator>
    </NavigationContainer>
  );
};

// MAIN STACK NAVIGATOR ENDS HERE

// HOME STACK NAVIGATOR
const HomeNavigator = createStackNavigator();

export const HomeNavigatorFunc = () => {
  const count = useSelector((state) => state.Cart.cartCount);
  return (
    <HomeNavigator.Navigator
    // initialRouteName="PriceOffer
    >
      <HomeNavigator.Screen
        name="HomeMain"
        component={Home}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: 17,
            letterSpacing: 1,
          },
          headerStyle: {
            backgroundColor: colors.Blue,
          },
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
                onPress={() => navigation.navigate("BarCode")}
                Icon
                width={27}
                height={27}
                imageUri={require("../assets/Icons/qr-code.png")}
              />
            </View>
          ),
          headerTintColor: "white",
          headerTitle: () => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: "70%",

                  justifyContent: "flex-end",
                }}
              ></View>
              <ImageComp
                // onPress={() => navigation.navigate("ClientNotification")}

                Icon
                width={120}
                height={30}
                imageUri={require("../assets/LogoWhite.png")}
              />
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  marginRight: 5,
                  height: "70%",
                  borderRadius: 125,

                  justifyContent: "flex-end",
                }}
              ></View>
              <ImageComp
                onPress={() => navigation.navigate("Bag")}
                style={{ marginRight: 20 }}
                Icon
                width={26}
                height={26}
                imageUri={require("../assets/Icons/cart.png")}
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
                <Text style={{ fontFamily: "Regular", fontSize: 10 }}>
                  {count}
                </Text>
              </View>
            </View>
          ),
        })}
      />
      <HomeNavigator.Screen
        name="BarCode"
        component={barCode}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.Blue },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Bold",
            fontSize: 17,
            letterSpacing: 1,
          },
          headerTitle: "SCAN BARCODE",
        }}
      />
    </HomeNavigator.Navigator>
  );
};

// TAB NAVIGATOR STARTS HERE
// TAB NAVIGATOR STARTS FROM HERE

const MainTab = createBottomTabNavigator();
const MainTabFunc = ({ route, navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.DarkGrey,
        inactiveTintColor: "white",
        style: {
          backgroundColor: colors.Blue,
          borderTopColor: colors.Blue,
          height: "7%",
        },
        labelStyle: { fontFamily: "Bold", textTransform: "uppercase" },
      }}
    >
      <MainTab.Screen
        options={({ route }) => ({
          tabBarLabel: (props) => (
            <Text style={{ color: props.color, fontWeight: "bold" }}>Home</Text>
          ),
          tabBarIcon: (props) => (
            <AntDesign name="home" size={props.size} color={props.color} />
          ),
        })}
        name="Home"
        component={HomeNavigatorFunc}
      />
      <MainTab.Screen
        options={({ route }) => ({
          tabBarLabel: (props) => (
            <Text style={{ color: props.color, fontWeight: "bold" }}>Shop</Text>
          ),
          tabBarIcon: (props) => (
            <AntDesign name="search1" size={props.size} color={props.color} />
          ),
        })}
        name="Shop"
        component={ShopNavigatorFunc}
      />
      <MainTab.Screen
        options={({ route }) => ({
          tabBarLabel: (props) => (
            <Text style={{ color: props.color, fontWeight: "bold" }}>Bag</Text>
          ),
          tabBarIcon: (props) => (
            <Feather
              name="shopping-bag"
              size={props.size}
              color={props.color}
            />
          ),
          unmountOnBlur: true,
        })}
        name="Bag"
        component={CheckoutNavigatorFunc}
      />
      <MainTab.Screen
        options={({ route }) => ({
          tabBarLabel: (props) => (
            <Text style={{ color: props.color, fontWeight: "bold" }}>
              Account
            </Text>
          ),
          tabBarIcon: (props) => (
            <Ionicons
              name="person-outline"
              size={props.size}
              color={props.color}
            />
          ),
        })}
        name="Account"
        component={AccountNavigatorFunc}
      />
    </MainTab.Navigator>
  );
};

// TAB NAVIGATOR END HERE

// // SWITCH NAVIGATOR
// const switchStack = createSwitchNavigator()

// const switchNavigator = () => {

// }
// TABS NAVIGATOR ENDS HERE

export default mainNavigator;
