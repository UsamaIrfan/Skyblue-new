import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { SubCategoriess, products } from "../../DummyData/Categories";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useEffect, useState } from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { colors } from "../../Constant";
import { ScrollView } from "react-native-gesture-handler";
import * as productActions from "../../Redux/Action/Products";
import ProductSkull from "../../COMPONENTS/Skeletons/ProductSkull";

const { width, height } = Dimensions.get("window");

const SubCategories = ({ route, navigation }) => {
  const [subCat, setSubCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoriesFetch = useSelector((state) => state.Product.Products);
  // console.log(categoriesFetch)

  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsLoading(true);
    const filterProduct = categoriesFetch.find(
      (item) => item.Id === route.params?.item.Id
    );
    getSubs();
    navigation.setOptions({ headerTitle: route.params?.item.Name });
    // setSubCat(filterProduct.SubCategoryItems);
    setIsLoading(false);
  }, [isFocused]);

  const getSubs = async () => {
    setIsLoading(true);
    await dispatch(
      productActions.RecursiveParentChildCategories(route.params?.item.Id)
    );
    setIsLoading(false);
  };

  const getSubsSubs = async (item) => {
    setIsLoading(true);
    await dispatch(productActions.RecursiveParentChildCategories(item.Id));
    setIsLoading(false);
  };

  const subCats = useSelector((state) => state.Product.subCats);

  const setSubSubCategoriesHandler = (item) => {
    if (!item.hasSub) {
      navigation.navigate("Listing", { item: item });
    } else {
      setSubCat(() => getSubsSubs(item));
    }
  };

  const renderList = ({ item, index }) => (
    // <TouchableOpacity
    //   onPress={() => setSubSubCategoriesHandler(item)}
    //   key={item.Id}
    //   style={{
    //     width: width / 2.3,
    //     // height: 125,
    //     marginTop: 25,
    //     backgroundColor: colors.Grey,
    //     justifyContent: "center",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,

    //     elevation: 5,
    //     borderRadius: 5,
    //     overflow: "hidden",
    //     marginHorizontal: 10,
    //   }}
    // >
    //   <View
    //     style={{
    //       width: width / 2.3,
    //       flex: 1,
    //       height: 100,
    //       backgroundColor: "#e5e5e5",
    //     }}
    //   >
    //     <ImageComp
    //       noPress
    //       width={"100%"}
    //       height={"100%"}
    //       imageUri={{ uri: item.PictureUrl }}
    //     />
    //   </View>
    //   <Text
    //     style={{
    //       padding: 5,
    //       // height: "100%",
    //       fontFamily: "Bold",
    //       color: "#fff",
    //       textAlign: "center",
    //       marginTop: 5,
    //       lineHeight: 18,
    //     }}
    //   >
    //     {item.Name}
    //   </Text>
    // </TouchableOpacity>
    <TouchableOpacity
      key={item.Id}
      activeOpacity={0.8}
      onPress={() => setSubSubCategoriesHandler(item)}
      style={{ alignItems: "center", position: "relative", marginVertical: 10 }}
    >
      <View style={styles.container}>
        <View style={styles.MainConainer}>
          <Image
            source={{
              uri: item.PictureUrl,
            }}
            style={{
              flex: 1,
              opacity: 0.9,
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
            }}
            resizeMode="cover"
          />
          <View
            style={{
              marginHorizontal: width * 0.02,
              marginTop: width * 0.02,
              flex: 0.25,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Regular",
                maxWidth: "80%",
                textAlign: "center",
                fontWeight: "bold",
                paddingVertical: 3,
                paddingHorizontal: 4,
                borderRadius: 8,
                backgroundColor: colors.Grey,
                color: "#fff",
              }}
            >
              {item.Name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ProductSkull />
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginBottom: 60 }}>
          <FlatList
            data={subCats}
            renderItem={renderList}
            bounces={true}
            refreshing={true}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

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

export default SubCategories;
