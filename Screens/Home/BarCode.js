import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { colors as Color, colors } from "../../Constant";
import { useSelector } from "react-redux";

const barCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const userId = useSelector((state) => state.Auth.Login.customerId);
  const searchProduct = (data) => {
    if (data === "98745aa") {
    } else {
      Alert.alert("No Product Found", [{ text: "Ok" }]);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // if(data === '041419420072') {
    //     navigation.navigate('Shop', {screen: 'Detailed', params:{id:2}})
    // }else{
    //     Alert.alert('No Product Found')
    // }
    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/GetProduct?customerId=${userId}&barcode=${data}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const resData = await response.json();
      console.log(resData);
      if (resData.Success === false) {
        Alert.alert(
          "No Product Found",
          "Sorry we are unable to find any product"
        );
      } else {
        navigation.navigate("Shop", {
          screen: "Detailed",
          params: { item: resData },
          initial: false,
        });
      }
    } catch (err) {
      Alert.alert("Something went wrong!", err.message);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "center", paddingTop: 10 }}>
        <Text
          style={{ fontSize: 19, fontFamily: "Regular", color: colors.Black }}
        >
          Scan Barcode
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Regular",
            color: colors.Grey,
            marginTop: 5,
          }}
        >
          Search Products with barcode..
        </Text>
      </View>
      <View style={{ width: "100%", height: 350, marginTop: 20 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={{
              width: "80%",
              height: 60,
              backgroundColor: Color.Blue,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 125,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              Tap to Scan Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    marginBottom: 60,
  },
});

export default barCode;
