import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
  TextInput,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import ImageComp from "../../COMPONENTS/UI/Image";
import ProductListing from "../../COMPONENTS/Products/ProductList";
import { categories, products } from "../../DummyData/Categories";
import { useSelector, useDispatch } from "react-redux";
import * as productAction from "../../Redux/Action/Products";
import { colors, Ionicons, FontAwesome } from "../../Constant";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as authActions from "../../Redux/Action/Auth";
import * as cartActions from "../../Redux/Action/Cart";
import { useIsFocused } from "@react-navigation/native";
import List from "../../COMPONENTS/List/index";
const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Reloading, setReloading] = useState(false);
  const [PageIndex, setPageIndex] = useState(1);
  // console.log(loginDetails);

  const isFocused = useIsFocused();

  const categoriesFetch = useSelector((state) => state.Product.Products);
  console.log(categoriesFetch);

  const sliderImages = useSelector((state) => state.Product.sliderImages);
  // console.log(sliderImages);

  const recentProducts = useSelector((state) => state.Product.recentProducts);
  // console.log("RECENT PRODUCTS API ======> ",recentProducts)

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    setIsLoading(true);
    await dispatch(productAction.fetchCategoriesFunc());
    setIsLoading(false);
    await dispatch(productAction.fetchSliderImages());
    setIsLoading(false);
  };

  const fetchRecentProducts = async () => {
    setIsLoading(true);
    await dispatch(productAction.getRecentProducts());
    setIsLoading(false);
  };

  // FETCH CATEGORIES
  useEffect(() => {
    fetchRecentProducts();
    // await dispatch(authActions.resetAction())
  }, []);

  // FETCH COUNTRIES
  const fetchCountryHandler = async () => {
    await dispatch(authActions.fetchCountry());
  };

  const fetchCountHandler = async () => {
    await dispatch(cartActions.fetchCountCart());
  };

  useEffect(() => {
    fetchCountHandler();
  }, [isFocused]);

  const reload = async () => {
    if (PageIndex < 8) {
      setPageIndex(PageIndex + 1);
      setReloading(true);
      await dispatch(productAction.addCategoriesFunc(PageIndex));
      setReloading(false);
    }
  };

  // FETCH CATEGORIES

  const renderCats = ({ item }) => (
    <React.Fragment>
      <List
        itemData={item}
        navigation={navigation}
        onSelect={() => {
          if (!item.HasSub) {
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
    </React.Fragment>
  );

  const renderItem = ({ item, index }) => (
    <React.Fragment>
      {/* {console.log("RECENT =====>", item)} */}
      <ProductListing
        item={item}
        Listing
        onPress={() => navigation.navigate("Detailed", { item: item })}
        key={index}
        imageUri={{
          uri: item?.PictureModels?.PictureModels[0].ImageUrl,
        }}
        title={item?.Name}
        description={item?.ShortDescription}
        price={`${item?.ProductPrice?.Price}`}
        imageUriSec={require("../../assets/Icons/shopping-bag.png")}
        widthSec={20}
        heightSec={20}
        // onPressSec={() => addToCardHandler(item)}
      />
    </React.Fragment>
  );

  const footer = () => {
    return (
      <View style={{ marginBottom: 60 }}>
        {PageIndex < 8 && (
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={reload}
              //On Click of button calling getData function to load more data
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load More</Text>
              {Reloading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            width: width * 0.9,
          }}
        >
          <Text style={{ fontFamily: "Regular" }}>Recent Products</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ fontFamily: "Regular" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    );
  };
  const Header = () => {
    return (
      <>
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
        <View style={{ width: width, height: 150, marginBottom: 10 }}>
          <Swiper autoplayTimeout={1.5} autoplay={true} style={styles.wrapper}>
            {sliderImages.map((item, index) => (
              <View key={index} style={styles.slide1}>
                <ImageComp
                  width={"100%"}
                  height={"100%"}
                  imageUri={{ uri: item }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      </>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getData}
        //On Click of button calling getData function to load more data
        style={styles.loadMoreBtn}
      >
        <Text style={styles.btnText}>Load More</Text>
        {isLoading ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        data={categoriesFetch}
        renderItem={renderCats}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        removeClippedSubviews={true}
        bounces={true}
        ListFooterComponent={footer}
        ListFooterComponentStyle={{ paddingLeft: 20 }}
        ListHeaderComponent={Header}
        refreshing={Reloading}
        onRefresh={() => {
          reload();
        }}
        // onEndReachedThreshold={1}
        // onEndReached={reload}
        // onEndReachedCalledDuringMomentum={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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

export default Home;
