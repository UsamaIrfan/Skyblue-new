import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native";
import * as authActions from "../Redux/Action/Auth";
import { useDispatch } from "react-redux";

const LogOut = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userData");
    await dispatch(authActions.LogoutFunc());
    setIsLoading(false);
    navigation.navigate("Login");
  };

  useEffect(() => {
    logoutHandler();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading === true ? <ActivityIndicator color="blue" size={23} /> : null}
    </View>
  );
};

export default LogOut;
