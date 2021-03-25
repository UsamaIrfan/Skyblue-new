import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../Constant";

import React from "react";
import Account from "../Screens/Account/Account";
import UserInfo from "../Screens/Account/Profile";
import OrderListing from "../Screens/Account/OrderListing";
import LogOut from "../Screens/Logout";
import OrderDetailed from "../Screens/Account/OrderDetailed";

// HOME STACK NAVIGATOR
const AccountNavigator = createStackNavigator();

export const AccountNavigatorFunc = () => {
  return (
    <AccountNavigator.Navigator
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
      }}
    >
      <AccountNavigator.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: "Account",
          headerShown: null,
        }}
      />
      <AccountNavigator.Screen
        name="Profile"
        component={UserInfo}
        options={{
          headerTitle: "PROFILE",
        }}
      />
      <AccountNavigator.Screen
        name="Orders"
        component={OrderListing}
        options={{
          headerTitle: "ORDERS",
        }}
      />
      <AccountNavigator.Screen
        name="OrderDetailed"
        component={OrderDetailed}
        options={{
          headerTitle: "ORDERS",
        }}
      />
      <AccountNavigator.Screen
        name="Logout"
        component={LogOut}
        options={{
          headerTitle: "LOGOUT",
        }}
      />
    </AccountNavigator.Navigator>
  );
};

// HOME STACK NAVIGATOR ENDS HERE
