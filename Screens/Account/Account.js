import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../Constant";
import ImageComp from "../../COMPONENTS/UI/Image";
import * as authActions from "../../Redux/Action/Auth";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const template = [
  { id: 1, value: "Profile" },
  { id: 2, value: "Orders" },
  { id: 3, value: "Scan Barcode" },
  { id: 4, value: "Logout" },
];

const Account = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigateHandler = (item) => {
    if (item === "Scan Barcode") {
      navigation.navigate("Home", { screen: "BarCode" });
    } else {
      navigation.navigate(item);
    }
  };

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const fetchProfileInfo = async () => {
    setIsLoading(true);
    await dispatch(authActions.UserInfo());
    setIsLoading(false);
  };

  // FETCH CATEGORIES
  useEffect(() => {
    fetchProfileInfo();
  }, [isFocused]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          height: 150,
          backgroundColor: colors.Blue,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}>
          John Smith Paul
        </Text>
      </View>
      <View style={{ paddingTop: 10, flex: 1 }}>
        {template.map((item) => (
          <View
            key={item.id.toString()}
            style={{ alignItems: "center", height: 50 }}
          >
            <TouchableOpacity
              onPress={() => navigateHandler(item.value)}
              style={{
                width: "90%",

                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "10%",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.value === "Profile" ? (
                  <ImageComp
                    Icon
                    width={23}
                    height={23}
                    imageUri={require("../../assets/Icons/user.png")}
                  />
                ) : null}
                {item.value === "Orders" ? (
                  <MaterialCommunityIcons
                    name="clipboard-text-multiple-outline"
                    size={24}
                    color={colors.Blue}
                  />
                ) : null}
                {item.value === "Scan Barcode" ? (
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={24}
                    color={colors.Blue}
                  />
                ) : null}
                {item.value === "Logout" ? (
                  <ImageComp
                    Icon
                    width={23}
                    height={23}
                    imageUri={require("../../assets/Icons/logout.png")}
                  />
                ) : null}
              </View>

              <View
                style={{
                  width: "70%",
                  height: "100%",

                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ fontSize: 16, color: "#747474" }}>
                  {item.value}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  height: "100%",

                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <ImageComp
                  Icon
                  width={18}
                  height={18}
                  imageUri={require("../../assets/Icons/next.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Regular",
            color: "#a7a7a7",
            fontSize: 12,
            letterSpacing: 2,
          }}
        >
          POWERED BY SKYBLUE
        </Text>
        <Text style={{ fontFamily: "Regular", color: "#a7a7a7", fontSize: 12 }}>
          App Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

export default Account;
