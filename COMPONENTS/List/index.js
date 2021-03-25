import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const List = (props) => {
  let itemData = props.itemData;
  let { navigation } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onSelect}
    >
      <View style={styles.container}>
        <View style={styles.MainConainer}>
          <Image
            source={{
              uri: itemData.PictureUrl
                ? itemData.PictureUrl
                : itemData.PictureModels.DefaultPictureModel.ImageUrl,
            }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
          <View
            style={{ paddingHorizontal: "5%", marginTop: "2%", flex: 0.25 }}
          >
            <Text
              style={{ fontSize: 16, textAlign: "left", fontWeight: "bold" }}
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
    backgroundColor: "#fff",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
});
