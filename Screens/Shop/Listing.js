import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import ProductListing from "../../COMPONENTS/Products/ProductList";
import { categories, products } from "../../DummyData/Categories";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../Redux/Action/Products";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import SuccessScreen from "../../COMPONENTS/UI/SuccessScreen";
import { colors, Ionicons, FontAwesome } from "../../Constant";
import * as cartActions from "../../Redux/Action/Cart";
import Loader from "../../COMPONENTS/Loader";
import ProductSkull from "../../COMPONENTS/Skeletons/ProductSkull";
const { width, height } = Dimensions.get("window");
const Listing = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Reloading, setReloading] = useState(false);
  const [PageIndex, setPageIndex] = useState(1);

  const userId = useSelector((state) => state.Auth.Login.customerId);
  const isFocused = useIsFocused();

  const productsAvailable = useSelector((state) => state.Product.catProducts);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setIsLoading(true);
    await dispatch(productAction.setProductEmpty());
    await setTimeout(async () => {
      await dispatch(productAction.fetchProductFunc(route.params?.item.Id));
    }, 500);
    navigation.setOptions({
      headerTitle: route.params?.item.Name + ` - (${productsAvailable.length})`,
    });
    setIsLoading(false);
  };

  const reload = async () => {
    setPageIndex(PageIndex + 1);
    setReloading(true);
    await dispatch(
      productAction.addProductFunc(route.params?.item.Id, PageIndex)
    );
    setReloading(false);
  };

  // FETCH CATEGORIES
  useEffect(() => {
    fetchProducts();
  }, [isFocused]);

  // ADD TO CART HANDLER
  const addToCardHandler = async (item) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://skybluewholesale.com:80/api/CatalogApi/AddProductToCart?customerId=${userId}&productId=${item.ProductPrice.ProductId}&quantity=1`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const resData = await response.json();
      console.log(resData);
      Alert.alert("Successfully Add", "Product successfully add to cart");
      await dispatch(cartActions.fetchCountCart());
    } catch (err) {
      Alert.alert("Something went wrong!", err.message);
    }
    setIsLoading(false);
  };

  const renderList = ({ item, index }) => (
    <ProductListing
      Listing
      onPress={() => navigation.navigate("Detailed", { item: item })}
      key={index}
      imageUri={{
        uri: item.PictureModels.PictureModels[0]?.ImageUrl,
      }}
      title={item.Name}
      description={item.ShortDescription}
      price={`${item.ProductPrice.Price}`}
      imageUriSec={require("../../assets/Icons/shopping-bag.png")}
      widthSec={20}
      heightSec={20}
      onPressSec={() => addToCardHandler(item)}
    />
  );

  // const listLoader = () => {
  //   if (Reloading) {
  //     return (
  //       <View style={styles.reloadContainer}>
  //         <ActivityIndicator color={colors.Blue} size="small" />
  //       </View>
  //     );
  //   }
  //   return (
  //     <View></View>
  //   );
  // };

  const renderHeader = () => (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width * 0.03,
      }}
    >
      <View style={{ ...styles.iconInput, zIndex: 3 }}>
        <FontAwesome
          name="search"
          size={24}
          color={colors.Blue}
          style={styles.icon}
        />
        <TextInput style={{ flex: 1 }} placeholder="Search" />
        <FontAwesome
          name="filter"
          size={24}
          color={colors.Blue}
          style={styles.icon}
        />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: width * 0.9 }}>
      <Text>No Products Found</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ProductSkull />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            padding: 20,
            paddingTop: 10,
            marginBottom: 20,
          }}
        >
          {/* {productsAvailable.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SuccessScreen
                  widthNeed
                  width={200}
                  height={200}
                  //   onPress={() => props.navigation.navigate("Home")}
                  imageUrl={require("../../assets/Icons/confirm.png")}
                  title="NO PRODUCT FOUND"
                  description="Sorry we are unable to find any product."
                />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  justifyContent: "space-between",
                  paddingTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {productsAvailable.map((item, index) => (
                  <ProductListing
                    Listing
                    onPress={() =>
                      navigation.navigate("Detailed", { item: item })
                    }
                    key={index}
                    imageUri={{
                      uri: item.PictureModels.PictureModels[0]?.ImageUrl,
                    }}
                    title={item.Name}
                    description={item.ShortDescription}
                    price={`${item.ProductPrice.Price}`}
                    imageUriSec={require("../../assets/Icons/shopping-bag.png")}
                    widthSec={20}
                    heightSec={20}
                    onPressSec={() => addToCardHandler(item)}
                  />
                ))}
              </View>
            )} */}
          <FlatList
            data={productsAvailable}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            refreshing={Reloading}
            bounces={true}
            ListHeaderComponentStyle={{ paddingBottom: 10 }}
            // onEndReached={reload}
            ListHeaderComponent={renderHeader}
            onRefresh={() => reload()}
            onEndReachedThreshold={1}
            ListEmptyComponent={renderEmpty}
            onEndReached={reload}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reloadContainer: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: colors.Blue,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  searchInputContainer: {
    width: width * 0.8,
    top: height * 0.05,
    position: "absolute",
    left: width / 10,
    minHeight: height * 0.18,
    maxHeight: height * 0.8,
  },
  iconInput: {
    flexDirection: "row",
    backgroundColor: colors.White,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
    zIndex: 1000,
    marginVertical: height * 0.02,
    borderRadius: 5,
    paddingHorizontal: "2%",
    paddingVertical: height * 0.015,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  icon: {
    alignItems: "center",
    marginHorizontal: width * 0.02,
    alignSelf: "flex-start",
  },
});

export default Listing;
