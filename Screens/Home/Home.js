import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import ImageComp from "../../COMPONENTS/UI/Image";
import { colors } from "../../Constant";
import ProductListing from "../../COMPONENTS/Products/ProductList";
import { categories, products } from "../../DummyData/Categories";
import { useSelector, useDispatch } from "react-redux";
import * as productAction from "../../Redux/Action/Products";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as authActions from "../../Redux/Action/Auth";
import * as cartActions from "../../Redux/Action/Cart";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loginDetails = useSelector((state) => state.Auth.Login);
  // console.log(loginDetails);

  const isFocused = useIsFocused();

  const categoriesFetch = useSelector((state) => state.Product.Products);
  // console.log(categoriesFetch.PictureUrl);

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
  }

  // FETCH CATEGORIES
  useEffect(() => {
    fetchCategories();
    fetchRecentProducts();
    // await dispatch(authActions.resetAction())
  }, []);


  // FETCH COUNTRIES
  const fetchCountryHandler = async () => {
    console.log("Someone Called");
    await dispatch(authActions.fetchCountry());
  };

  useEffect(() => {
    fetchCountryHandler();
  }, []);

  // FETCH CART COUNT

  const fetchCountHandler = async () => {
    await dispatch(cartActions.fetchCountCart());
  };

  useEffect(() => {
    fetchCountHandler();
  }, [isFocused]);

  const categoriesHandler = (item) => {
    if (item.SubCategoryItems.length === 0) {
      console.log("GO TO LISTING");
      navigation.navigate("Shop", {
        screen: "Listing",
        params: { id: item.Id, name: item.Name },
        initial: false,
      });
    } else {
      console.log("Go to Details");
      navigation.navigate("Shop", {
        screen: "SubCategories",
        params: { id: item.Id },
        initial: false,
      });
    }
  };

  if (!isLoading&& Object.keys(categoriesFetch).length==null) {
    console.log("working")
    
  }


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={25} color={colors.Blue} />
            <Text>Please Wait...</Text>
          </View>
    
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 150 }}>
              <Swiper autoplay={true} style={styles.wrapper}>
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
                  key={item.Id}
                  onPress={() => categoriesHandler(item)}
                  style={{
                    width: width / 3.5,
                    height: 125,
                    marginTop: 25,
                    backgroundColor: "#e5e5e5",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    borderRadius:5,
                    overflow:'hidden'
                  }}
                >
                  <View
                    style={{
                      width: width / 3.5,
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
                    numberOfLines={2}
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

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingTop: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "Bold", color: "#484848" }}
              >
                Recent Products
              </Text>
              <Text
                style={{ fontSize: 13, fontFamily: "Bold", color: "#484848" }}
              >
                VIEW ALL
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  justifyContent: "space-between",
                  paddingTop: 20,
                }}
              >
                {recentProducts.map((item, index) => (
                  <ProductListing
                    //  onPress={()=> navigation.navigate('Shop',{screen:'Detailed',params:{id: item.id},initial: false})}
                    key={index}
                    imageUri={{ uri: item.PictureModels.DefaultPictureModel.ImageUrl }}
                    title={item.Name}
                    description={item.Description ? item.Description : ""}
                    price={`$ ${item.ProductPrice.Price}`}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
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
});

export default Home;
