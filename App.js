import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./NAVIGATOR/Navigator";
import FlashMessage from "react-native-flash-message";
// FONTS LOAD
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// Redux Imports

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
// Redux Imports End here

// Reducers Import here
import cartReducer from "./Redux/Reducers/Cart";
import authReducer from "./Redux/Reducers/Auth";
import productReducer from "./Redux/Reducers/Product";
import { colors } from "./Constant";

const fetchFonts = () => {
  return Font.loadAsync({
    Bold: require("./assets/FONTS/medium.otf"),
    Regular: require("./assets/FONTS/regular.otf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  const rootReducer = combineReducers({
    Cart: cartReducer,
    Auth: authReducer,
    Product: productReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <MainNavigator>
        <StatusBar style="auto" light backgroundColor={colors.Blue} />
      </MainNavigator>
      <FlashMessage />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
