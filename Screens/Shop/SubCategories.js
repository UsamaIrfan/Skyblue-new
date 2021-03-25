import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SubCategoriess, products } from "../../DummyData/Categories";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useEffect, useState } from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { colors } from "../../Constant";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const SubCategories = ({ route, navigation }) => {
  const [subCat, setSubCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoriesFetch = useSelector((state) => state.Product.Products);
  // console.log(categoriesFetch)

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsLoading(true);
    const filterProduct = categoriesFetch.find(
      (item) => item.Id === route.params?.item.Id
    );

    navigation.setOptions({ headerTitle: filterProduct.Name });
    setSubCat(filterProduct.SubCategoryItems);
    setIsLoading(false);
  }, [isFocused]);

  const setSubSubCategoriesHandler = (item) => {
    if (item.SubCategoryItems?.length === 0) {
      navigation.navigate("Listing", {item: item});
      // navigation.navigate('Shop',{screen: 'Listing' , params:{id: item.Id}})
    } else {
      setSubCat(item.SubCategoryItems);
      // navigation.navigate('Shop', {screen:'SubCategories', params:{id:item.Id}})
    }
  };

  const renderList = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSubSubCategoriesHandler(item)}
      key={item.Id}
      style={{
        width: width / 2.3,
        // height: 125,
        marginTop: 25,
        backgroundColor: colors.Grey,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 5,
        overflow: "hidden",
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          width: width / 2.3,
          flex: 1,
          height: 100,
          backgroundColor: "#e5e5e5",
        }}
      >
        <ImageComp
          noPress
          width={"100%"}
          height={"100%"}
          imageUri={{ uri: item.PictureUrl }}
        />
      </View>
      <Text
        style={{
          padding: 5,
          // height: "100%",
          fontFamily: "Bold",
          color: "#fff",
          textAlign: "center",
          marginTop: 5,
          lineHeight: 18,
        }}
      >
        {item.Name}
      </Text>
    </TouchableOpacity>
  );

  return (
    // <ScrollView>
    //   <View style={{ flex: 1 }}>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         flexWrap: "wrap",
    //         paddingHorizontal: 15,
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       {subCat.map((item, index) => (
    //         <TouchableOpacity
    //           onPress={() => setSubSubCategoriesHandler(item)}
    //           key={item.Id}
    //           style={{
    //             width: width / 2.3,
    //             // height: 125,
    //             marginTop: 25,
    //             backgroundColor: colors.Grey,
    //             justifyContent: "center",
    //             shadowColor: "#000",
    //             shadowOffset: {
    //               width: 0,
    //               height: 2,
    //             },
    //             shadowOpacity: 0.25,
    //             shadowRadius: 3.84,

    //             elevation: 5,
    //             borderRadius: 5,
    //             overflow: "hidden",
    //           }}
    //         >
    //           <View
    //             style={{
    //               width: width / 2.3,
    //               flex: 1,
    //               height: 100,
    //               backgroundColor: "#e5e5e5",
    //             }}
    //           >
    //             <ImageComp
    //               noPress
    //               width={"100%"}
    //               height={"100%"}
    //               imageUri={{ uri: item.PictureUrl }}
    //             />
    //           </View>
    //           <Text
    //             style={{
    //               padding: 5,
    //               // height: "100%",
    //               fontFamily: "Bold",
    //               color: "#fff",
    //               textAlign: "center",
    //               marginTop: 5,
    //               lineHeight: 18,
    //             }}
    //           >
    //             {item.Name}
    //           </Text>
    //         </TouchableOpacity>
    //       ))}
    //     </View>
    //   </View>
    // </ScrollView>
    <View style={{ flex: 1 , alignItems: "center", marginBottom: 60}}>
      <FlatList
        data={subCat}
        renderItem={renderList}
        bounces={true}
        refreshing={true}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default SubCategories;
