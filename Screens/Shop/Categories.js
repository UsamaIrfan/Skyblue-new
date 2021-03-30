import React, {useState} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { categories, products } from "../../DummyData/Categories";
import ImageComp from "../../COMPONENTS/UI/Image";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../Constant";
import List from "../../COMPONENTS/List/index";
import * as productAction from "../../Redux/Action/Products";

const { width, height } = Dimensions.get("window");

const Categories = ({ navigation }) => {
  const categoriesFetch = useSelector((state) => state.Product.Products);
  // console.log(categoriesFetch);
  const [Reloading, setReloading] = useState(false);
  
  const [PageIndex, setPageIndex] = useState(1);

  const dispatch = useDispatch()

  const categoriesHandler = (item) => {
    if (!item.HasSub) {
      navigation.navigate("Listing", { id: item.Id, name: item.Name });
    } else {
      navigation.navigate("SubCategories", { id: item.Id });
    }
  };

  const reload = async () => {
    if (PageIndex < 8) {
      setPageIndex(PageIndex + 1);
      setReloading(true);
      await dispatch(productAction.addCategoriesFunc(PageIndex));
      setReloading(false);
    }
  };

  const renderFooter = () => (
    <React.Fragment>
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
    </React.Fragment>
  );

  const renderItem = ({ item }) => (
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
  );

  return (
    <View style={{ flex: 1, alignItems: "center", marginBottom: 60, }}>
      <FlatList
        data={categoriesFetch}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        numColumns={2}
        ListFooterComponent={renderFooter}
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

export default Categories;
