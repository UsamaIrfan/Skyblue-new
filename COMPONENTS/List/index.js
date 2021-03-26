import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {colors} from "../../Constant";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const List = (props) => {
  let itemData = props.itemData;
  let { navigation } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onSelect}
      style={{ alignItems: "center" , position: "relative", marginVertical: 10,}}
    >
      <View style={styles.container}>
        <View style={styles.MainConainer}>
          <Image
            source={{
              uri: itemData.PictureUrl
                ? itemData.PictureUrl
                : itemData.PictureModels.DefaultPictureModel.ImageUrl,
            }}
            style={{ flex: 1, opacity: 0.9 ,position: "absolute", top: 0, height: "100%", width: "100%"}}
            resizeMode="cover"
          />
          <View
            style={{ marginHorizontal: width * 0.02 ,marginTop: width * 0.02, flex: 0.25 }}
          >
            <Text
              style={{ fontSize: 14, fontFamily: "Regular", maxWidth: "80%", textAlign: "center", fontWeight: "bold" , paddingVertical: 3, paddingHorizontal: 4, borderRadius: 8, backgroundColor: colors.Blue, color: "#fff"}}
            >
              {itemData.Name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginLeft: 5,
  },
  MainConainer: {
    height: height * 0.22,
    width: width * 0.45,
    marginHorizontal: 5,
    // backgroundColor: "#fff",
    // margin: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    
    // elevation: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
});
