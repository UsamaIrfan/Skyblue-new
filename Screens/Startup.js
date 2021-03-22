import React, { useEffect,useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../Redux/Action/Auth";

import { TouchableOpacity } from "react-native-gesture-handler";

const StartupScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false)

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
  }, [dispatch]);

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
