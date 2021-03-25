// DEFAULTS IMPORTS
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import ImageComp from "../COMPONENTS/UI/Image";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

// IMPORTS OF ALL NAVIGATIONS
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { NavigationActions, StackActions } from "react-navigation";
import Svg, { Path } from "react-native-svg";

import * as authActions from "../Redux/Action/Auth";
import * as productAction from "../Redux/Action/Products";

import { ShopNavigatorFunc } from "../NAVIGATOR/ShopNavigator";

// Screens Imports
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import { colors } from "../Constant";
import Home from "../Screens/Home/Home";
import { CheckoutNavigatorFunc } from "./CheckoutNavigator";
import { AccountNavigatorFunc } from "./AccountNavigator";
import barCode from "../Screens/Home/BarCode";
import { useSelector, useDispatch } from "react-redux";
import DashBoardSkeleton from "../COMPONENTS/Skeletons/DashboardSkull";

const mainStack = createStackNavigator();

const mainNavigator = () => {
  const [AppLoading, setAppLoading] = useState(true);
  const [IsUser, setIsUser] = useState();

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    await dispatch(productAction.fetchCategoriesFunc());
    await dispatch(productAction.fetchSliderImages());
  };

  const fetchRecentProducts = async () => {
    await dispatch(productAction.getRecentProducts());
  };

  // FETCH COUNTRIES
  const fetchCountryHandler = async () => {
    await dispatch(authActions.fetchCountry());
  };

  const tryLogin = async () => {
    const userStorage = await AsyncStorage.getItem("userData");
    setIsUser(userStorage);
    console.log("Stored Data ===>", userStorage);

    if (!userStorage) {
      setAppLoading(false);
      return;
    }

    const transformedData = JSON.parse(userStorage);
    const { userData } = transformedData;

    dispatch(authActions.Authenticate(userData));
    setAppLoading(false);
  };

  useEffect(() => {
    setAppLoading(true);
    fetchCategories();
    fetchRecentProducts();
    fetchCountryHandler();
    setTimeout(() => {
      tryLogin();
    }, 1000);
  }, []);

  if (AppLoading) {
    return <DashBoardSkeleton />;
  }

  if (!IsUser) {
    return (
      <NavigationContainer>
        <mainStack.Navigator>
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
  } else {
    // const count = useSelector((state) => state.Cart.cartCount);
    const Tab = createBottomTabNavigator();
    const HomeNavigatorFunc = () => {
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
                <View style={{ paddingLeft: 10 }}>
                  <Ionicons
                    name="qr-code"
                    size={24}
                    color="#fff"
                    onPress={() => navigation.navigate("BarCode")}
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
                    Icon
                    width={120}
                    height={30}
                    imageUri={require("../assets/LogoWhite.png")}
                  />
                </View>
              ),

              headerRight: () => (
                <View style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="cart-outline"
                    size={30}
                    color="#fff"
                    onPress={() => navigation.navigate("Bag")}
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
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              borderTopWidth: 0,
              backgroundColor: "transparent",
              elevation: 0,
            },
          }}
          tabBar={(props) => <CustomTabBar props={props} />}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigatorFunc}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="home-sharp"
                  size={25}
                  color={focused ? colors.Blue : "#000"}
                />
              ),
              tabBarButton: (props) => <TabBarCustomButton {...props} />,
            }}
          />

          <Tab.Screen
            name="Search"
            component={ShopNavigatorFunc}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="search"
                  size={25}
                  color={focused ? colors.Blue : "#000"}
                />
              ),
              tabBarButton: (props) => <TabBarCustomButton {...props} />,
            }}
          />

          <Tab.Screen
            name="Like"
            component={CheckoutNavigatorFunc}
            options={{
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="shopping-bag"
                  size={25}
                  color={focused ? colors.Blue : "#000"}
                />
              ),
              tabBarButton: (props) => <TabBarCustomButton {...props} />,
            }}
          />

          <Tab.Screen
            name="User"
            component={AccountNavigatorFunc}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="person-circle"
                  size={25}
                  color={focused ? colors.Blue : "#000"}
                />
              ),
              tabBarButton: (props) => <TabBarCustomButton {...props} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

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
            <View style={{ paddingLeft: 10 }}>
              <Ionicons
                name="qr-code"
                size={24}
                color="#fff"
                onPress={() => navigation.navigate("BarCode")}
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
                Icon
                width={120}
                height={30}
                imageUri={require("../assets/LogoWhite.png")}
              />
            </View>
          ),

          headerRight: () => (
            <View style={{ paddingRight: 15 }}>
              <Ionicons
                name="cart-outline"
                size={30}
                color="#fff"
                onPress={() => navigation.navigate("Bag")}
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

const Tab = createBottomTabNavigator();

const MainTabFunc = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigatorFunc}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-sharp"
              size={25}
              color={focused ? colors.Blue : "#000"}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={ShopNavigatorFunc}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              size={25}
              color={focused ? colors.Blue : "#000"}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Like"
        component={CheckoutNavigatorFunc}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="shopping-bag"
              size={25}
              color={focused ? colors.Blue : "#000"}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={AccountNavigatorFunc}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle"
              size={25}
              color={focused ? colors.Blue : "#000"}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default mainNavigator;

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"#FFF"}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#FFF",
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: "#FFF",
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  return <BottomTabBar {...props.props} />;
};
