import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { categories, products } from "../../DummyData/Categories";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const Categories = ({ navigation }) => {
  const categoriesFetch = useSelector((state) => state.Product.Products);
  console.log(categoriesFetch);

  const categoriesHandler = (item) => {
    if (item.SubCategoryItems.length === 0) {
      console.log("GO TO LISTING");
      navigation.navigate("Listing", { id: item.Id, name: item.Name });
    } else {
      console.log("Go to Details");
      navigation.navigate("SubCategories", { id: item.Id });
    }
  };

  return (
    <ScrollView>
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          {categoriesFetch.map((item, index) => (
            <TouchableOpacity
              onPress={() => categoriesHandler(item)}
              key={item.Id}
              style={{
                width: width / 2.3,
                marginTop: 25,
                backgroundColor: "#e5e5e5",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 5,
                borderRadius:5,
                overflow:'hidden'
              }}
            >
              <View
                style={{
                  width: width / 2.3,
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
                  fontFamily: "Bold",
                  color: "#484848",
                  textAlign: "center",
                  marginTop: 5,
                  lineHeight: 18,
                }}
              >
                {item.Name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Categories;
