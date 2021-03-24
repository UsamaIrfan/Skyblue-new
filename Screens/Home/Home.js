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
  const loginDetails = useSelector((state) => state.Auth.Login);
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

  // useEffect(() => {
  //   fetchCountryHandler();
  // }, []);

  // FETCH CART COUNT

  const fetchCountHandler = async () => {
    await dispatch(cartActions.fetchCountCart());
  };

  useEffect(() => {
    fetchCountHandler();
  }, [isFocused]);

  const categoriesHandler = (item) => {
    if (item.SubCategoryItems.length === 0) {
      navigation.navigate("Shop", {
        screen: "Listing",
        params: { id: item.Id, name: item.Name },
        initial: false,
      });
    } else {
      navigation.navigate("Shop", {
        screen: "SubCategories",
        params: { id: item.Id },
        initial: false,
      });
    }
  };

  if (!isLoading && Object.keys(categoriesFetch).length == null) {
    console.log("working");
  }

  const getData = () => {
    console.log("getData");
    alert("done");
    // setIsLoading(true);
    // //Service to get the data from the server to render
    // fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + offset)
    //   //Sending the currect offset with get request
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Successful response from the API Call
    //     setOffset(offset + 1);
    //     //After the response increasing the offset for the next API call.
    //     setDataSource([...dataSource, ...responseJson.results]);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const renderItem = ({ item }) => (
    <List
      itemData={item}
      navigation={navigation}
      onSelect={() => {
        navigation.navigate("Shop", {
          screen: "Listing",
          params: {id: item.Id, name: item.Name},
          initial: false,
        });
      }}
    />
  );

  const footer = () => {
    return (
      <View style={{ marginBottom: 60 }}>
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
      <View style={styles.footer}>
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categoriesFetch}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        removeClippedSubviews={true}
        bounces={true}
        ListFooterComponent={footer}
        ListHeaderComponent={Header}
        refreshing={true}
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
    backgroundColor: "#800000",
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
