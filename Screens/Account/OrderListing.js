import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Loader from "../../COMPONENTS/Loader";

import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../../Redux/Action/Cart";
import ImageComp from "../../COMPONENTS/UI/Image";
import { colors as Color, MaterialIcons } from "../../Constant";

const OrderListing = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const Orders = useSelector((state) => state.Cart.order);
  const dispatch = useDispatch();

  const fetchingOrder = useCallback(async () => {
    setIsLoading(true);
    setFetch(false);
    await dispatch(cartAction.fetchOrder());
    setIsLoading(false);
    setFetch(true);
  }, []);
  useEffect(() => {
    fetchingOrder();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginBottom: 60 }}>
        {fetch === true && (
          <FlatList
            data={Orders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: "100%",
                  paddingVertical: 30,
                  borderBottomColor: "#e5e5e5",
                  borderBottomWidth: 1,
                  paddingHorizontal: 15,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 19, color: "#484848" }}>
                    ORDER NUMBER #{item.CustomOrderNumber}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={28}
                    color={Color.Blue}
                    onPress={() =>
                      props.navigation.navigate("OrderDetailed", {
                        order: item,
                      })
                    }
                  />
                </View>
                <Text style={{ fontSize: 17, color: Color.primary }}>
                  Total Amount {item.OrderTotal}
                </Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    paddingTop: 15,
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#a7a7a7" }}>Order Status:</Text>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                      {item.OrderStatus}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={{ color: "#a7a7a7" }}>Date:</Text>
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                      {item.CreatedOn.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default OrderListing;
