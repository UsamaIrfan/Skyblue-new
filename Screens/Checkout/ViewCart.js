import React, { useState, useCallback, useEffect, isValidElement } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from "react-native";

import ImageComp from "../../COMPONENTS/UI/Image";
import CartProductRow from "../../COMPONENTS/Checkout/CartProductRow";
import {colors as Color, colors} from "../../Constant";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import SuccessScreen from '../../COMPONENTS/UI/SuccessScreen'
import * as cartAction from "../../Redux/Action/Cart";
import { useDispatch, useSelector } from "react-redux";
import { back } from "react-native/Libraries/Animated/src/Easing";
// import EmptyScreen from "../../Components/UI/EmptyScreen";
// import { isDate } from "moment";
const ViewCart = props => {
  const [subTotalPrice, setSubtotalPrice] = useState(0);

  const [isQuantityAdd, setQuantityAdd] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const cartProducts = useSelector(state => state.Cart.cart);
  console.log(cartProducts);
  const userId = useSelector(state=>state.Auth.Login.customerId)
  const isFocused = useIsFocused()

  // FETCH CART DATA
  const dispatch = useDispatch();

  const subTotalHandler = useCallback(() => {
    let subtotal = 0;
    for (let key in cartProducts.Items) {
      subtotal = subtotal + cartProducts.Items[key].SubTotal;
    }
    setSubtotalPrice(subtotal);
  }, [isFetch]);

  useEffect(() => {
    subTotalHandler();
  }, [isFetch]);

  const fetchViewCartData = useCallback(async () => {
    // setCount(count + 1);

    setIsFetch(true);

    await dispatch(cartAction.fetchCartData());

    setIsFetch(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchViewCartData().then(() => {
      setIsLoading(false);
    });
  }, [isDelete, isQuantityAdd,isFocused]);

// ADD TO CART HANDLER
const cartAllItemsHandler = async () =>{
  setIsLoading(true);
  setIsDelete(true)

  try {
    const response = await fetch(
      `http://skybluewholesale.com:80/api/CatalogApi/RemoveAllItemsFromCart?customerId=${userId}`,
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
    Alert.alert('Successfully Removed', 'Successfully removed all items from cart')
  } catch (err) {
    Alert.alert('Something went wrong!', err.message);
  }
  setIsDelete(false)
  setIsLoading(false);
}




  useEffect(()=>{
props.navigation.setOptions({
  headerRight: () => (
    <TouchableOpacity onPress={cartAllItemsHandler} style={{width:100, height:'100%', justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontFamily:'Regular', color:'white', fontSize:14, letterSpacing:2}}>CLEAR</Text>
    </TouchableOpacity>
  )
})
  },[])

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //     "willFocus",
  //     fetchViewCartData
  //   );
  

  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [fetchViewCartData]);

  const quantityAmountHandler = useCallback(
    async (quan, pId) => {
      const selectedProduct = cartProducts.filter(item => item.id === pId);
      // console.log(selectedProduct);
      // console.log(cartProducts);
      console.log("here you go");
      console.log(cartProducts);
      setQuantityAdd(true);
      if (selectedProduct.length !== 0 && selectedProduct[0].id !== null) {
        const {
          id,
          title,
          imageUrl,
          discountPrice,
          prodId,
          price
        } = selectedProduct[0];

        await dispatch(
          cartAction.addToCartUpdate(
            id,
            prodId,
            title,
            imageUrl,
            price,
            discountPrice,
            quan
          )
        );
      }
      setQuantityAdd(false);
    },
    [isFetch]
  );

  const deleteHandler = useCallback(async cId => {
    console.log(cId);
    setIsDelete(true);
    await dispatch(cartAction.deleteCart(cId));
    setIsDelete(false);
  }, []);
  if (isFetch === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={55} color={Color.Blue} />
        <Text>Please wait..</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
 
      {isLoading === true ? (
        <ActivityIndicator color="red" size={26} />
      ) : (
        <View style={{ flex: 1 }}>
          {cartProducts.Items?.length === 0 ? (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           <SuccessScreen
                widthNeed
                  width={200}
                  height={200}
              
                //   onPress={() => props.navigation.navigate("Home")}
                  imageUrl={require("../../assets/Icons/confirm.png")}
                  title="EMPTY BAG"
                  description="Looks like you haven't made your choice yet."
                />
            </View>
          ) : (
            <View
              style={{
                flex: 1,

                justifyContent: "space-between"
              }}
            >
              <View style={{ width: "100%", flex: 1 }}>
                <FlatList
                  data={cartProducts.Items}
                  keyExtractor={(item,index) => item.Id.toString()}
                  renderItem={itemData => (
                    <CartProductRow
                    cancel
                    checkout
                      navigation={props.navigation}
                      title={itemData.item.ProductName}
                      imageUrl={{ uri: itemData.item.Picture.ImageUrl }}
                      price={itemData.item.SubTotal}
                      quantity={itemData.item.Quantity}
                      onPressCancel={() => deleteHandler(itemData.item.Id)}
                      id={itemData.item.id}
                      quantityReturnBack={quantityAmountHandler}
                    />
                  )}
                />
              </View>

              <View
                style={{
                  width: "100%",

                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: "100%", paddingHorizontal:15 }}>
                  <View
                    style={{
                      width: "100%",
                    
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    
                   
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Subtotal</Text>
                    <Text style={{ fontSize: 18 }}>{cartProducts.OrderTotals.OrderTotal}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      borderColor: "#e5e5e5",
                    
                      borderBottomWidth: 1
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>Shipping</Text>
                    <Text style={{ fontSize: 18 }}>{cartProducts.OrderTotals.Shipping}</Text>
                  </View>
                </View>
                <View style={{width:'100%', paddingVertical:15, alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Checkout")
                  }
                  style={{
                    width: "80%",
                    height: 50,
                    backgroundColor: Color.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius:125,
                    backgroundColor:colors.Blue,
               
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>
                   {cartProducts.OrderTotals.OrderTotal} - CHECKOUT
                  </Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ViewCart;
