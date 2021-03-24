import React, { useEffect,useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  AsyncStorage,
  Text
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../Redux/Action/Auth";
import * as productAction from "../Redux/Action/Products";
import DashBoardSkeleton from "../COMPONENTS/Skeletons/DashboardSkull"

import { TouchableOpacity } from "react-native-gesture-handler";

const StartupScreen = ({ route, navigation }) => {
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

  useEffect(() => {
    const tryLogin = async () => {
      const userStorage = await AsyncStorage.getItem("userData");
      console.log(userStorage);

      if (!userStorage) {
          navigation.navigate("Login");    
        return;
      }

      const transformedData = JSON.parse(userStorage);
      const { userData } = transformedData;
   
      console.log(userData);
      navigation.navigate('Home',{screen:'Home'})
      
      dispatch(authActions.Authenticate(userData));

      //   const transformedData = JSON.parse(userData);
      //   const { token, userId, password } = transformedData;

      //   props.navigation.navigate('Shop');
    };

    tryLogin();
    fetchCountryHandler();
    fetchCategories();
    fetchRecentProducts();
  }, []);

  useEffect(() => {

    const tryLogin = async () => {
      const userStorage = await AsyncStorage.getItem("userData");
      console.log(userStorage);

      if (!userStorage) {
          navigation.navigate("Login");    
        return;
      }

      const transformedData = JSON.parse(userStorage);
      const { userData } = transformedData;
   
      console.log(userData);
      navigation.navigate('Home',{screen:'Home'})
      
      dispatch(authActions.Authenticate(userData));

      //   const transformedData = JSON.parse(userData);
      //   const { token, userId, password } = transformedData;

      //   props.navigation.navigate('Shop');
    };

    const unsubscribe = navigation.addListener('focus', () => {
        tryLogin()
    });

    return unsubscribe;
}, [navigation]);



  return (
    <View style={styles.screen}>
      <DashBoardSkeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default StartupScreen;
