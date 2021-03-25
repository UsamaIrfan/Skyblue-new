import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { categories, products } from "../../DummyData/Categories";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../Constant";
import List from "../../COMPONENTS/List/index";

const { width, height } = Dimensions.get("window");

const Categories = ({ navigation }) => {
  const categoriesFetch = useSelector((state) => state.Product.Products);
  // console.log(categoriesFetch);

  const categoriesHandler = (item) => {
    if (item.SubCategoryItems.length === 0) {
      navigation.navigate("Listing", { id: item.Id, name: item.Name });
    } else {
      navigation.navigate("SubCategories", { id: item.Id });
    }
  };
  const renderItem = ({ item }) => (
    <List
      itemData={item}
      navigation={navigation}
      onSelect={() => {
        if (item.SubCategoryItems.length === 0) {
          navigation.navigate("Search", {
            screen: "Listing",
            params: { item: item },
            initial: false,
          });
        } else {
          navigation.navigate("Search", {
            screen: "SubCategories",
            params: { item: item },
            initial: false,
          });
        }
      }}
    />
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={categoriesFetch}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </View>

    // <ScrollView>
    //   <View>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         flexWrap: "wrap",
    //         paddingHorizontal: 15,
    //         justifyContent: "space-between",
    //         flex: 1,
    //         backgroundColor:'pink'
    //       }}
    //     >
    //       {categoriesFetch.map((item, index) => (
    //         <TouchableOpacity
    //           onPress={() => categoriesHandler(item)}
    //           key={item.Id}
    //           style={{
    //             width: width / 2.3,
    //             // height: 125,
    //             marginTop: 25,
    //             backgroundColor: colors.Blue,
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
    //               height: 100,
    //               backgroundColor: "#e5e5e5",
    //               flex: 1,
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
  );
};

export default Categories;
