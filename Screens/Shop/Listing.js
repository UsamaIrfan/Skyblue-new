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
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { colors, FontAwesome } from "../../Constant";
import * as cartActions from "../../Redux/Action/Cart";
import { showSimpleMessage } from "../../Redux/Action/General";
import ProductSkull from "../../COMPONENTS/Skeletons/ProductSkull";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const Listing = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Reloading, setReloading] = useState(false);
  const [PageIndex, setPageIndex] = useState(1);
  const [Search, setSearch] = useState(null);

  const userId = useSelector((state) => state.Auth.Login.customerId);
  const isFocused = useIsFocused();

  const [ProductsAvailable, setProductsAvailable] = useState();

  const dispatch = useDispatch();

  const id = useSelector((state) => state.Auth.Login.customerId);

  const fetchProducts = async () => {
    setIsLoading(true);
    setProductsAvailable([]);
    await fetchProductFunc(route.params?.item.Id, 0);
    navigation.setOptions({
      headerTitle:
        route.params?.item.Name + ` - (${ProductsAvailable?.length})`,
    });
    setIsLoading(false);
  };

  const reload = async () => {
    setPageIndex(PageIndex + 1);
    await addfetchProductFunc(route.params?.item.Id, PageIndex);
  };

  const fetchProductFunc = async (catId, pageIndex) => {
    setIsLoading(true);
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/Products?customerId=${id}&categoryId=${catId}&pageIndex=${pageIndex}&pageSize=6`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setProductsAvailable(response.data.obj);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
  };

  const addfetchProductFunc = async (catId, pageIndex) => {
    setReloading(true);
    await axios
      .post(
        `http://skybluewholesale.com:80/api/CatalogApi/Products?customerId=${id}&categoryId=${catId}&pageIndex=${pageIndex}&pageSize=6`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setProductsAvailable(ProductsAvailable.concat(response.data.obj));
        setReloading(false);
      })
      .catch((error) => {
        setReloading(false);
        throw new Error("Something Went Wrong While Getting Product Listing.");
      });
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
      showSimpleMessage("success", {
        message: "Success",
        description: "Added to Cart",
      });
      await dispatch(cartActions.fetchCountCart());
    } catch (err) {
      showSimpleMessage("warning", {
        message: "Failed",
        description: "Unable to Add to Cart",
      });
    }

    setIsLoading(false);
  };

  const renderList = ({ item, index }) => (
    <React.Fragment>
      <ProductListing
        item={item}
        Listing
        onPress={() => navigation.navigate("Detailed", { item: item })}
        key={index}
        imageUri={{
          uri: item?.PictureModels?.PictureModels[0]?.ImageUrl,
        }}
        title={item.Name}
        description={item?.ShortDescription}
        price={`${item?.ProductPrice?.Price}`}
        imageUriSec={require("../../assets/Icons/shopping-bag.png")}
        widthSec={20}
        heightSec={20}
        onPressSec={() => addToCardHandler(item)}
      />
    </React.Fragment>
  );

  const renderHeader = () => (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width * 0.03,
      }}
    ></View>
  );

  if (isLoading) {
    <View>
      <ProductSkull />
    </View>;
  }

  const renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
      }}
    >
      <Text>No Products Found</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, marginBottom: 60 }}>
      {isLoading ? (
        <ProductSkull />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 10,
            // marginBottom: 20,
          }}
        >
          {ProductsAvailable && (
            <FlatList
              data={ProductsAvailable}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              refreshing={Reloading}
              ListHeaderComponentStyle={{ paddingBottom: 10 }}
              ListHeaderComponent={renderHeader}
              ListEmptyComponent={renderEmpty}
              onRefresh={() => reload()}
              onEndReachedThreshold={1}
              onEndReached={reload}
              onEndReachedCalledDuringMomentum={true}
            />
          )}
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
