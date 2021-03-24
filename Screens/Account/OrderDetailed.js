import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import OrderField from "../../COMPONENTS/Checkout/OrderField";
import CartProductRow from "../../COMPONENTS/Checkout/CartProductRow";



const OrderDetailed = props => {
//   const orderNo = props.navigation.getParam("orderNumber");
//   const order = props.navigation.getParam("order");



const item = props.route.params?.order
  // console.log(item);

  useEffect(()=>{
    props.navigation.setOptions({
      headerTitle: `Order #${item.CustomOrderNumber}`
    })
    },[])
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <OrderField name="Order Number" value={item.CustomOrderNumber} />
         
         
          <OrderField name="Order Status" value={item.OrderStatus} />
          <OrderField name="Payment Status" value={item.PaymentStatus} />
          <OrderField name="Shipping Status" value={item.ShippingStatus} />
          <OrderField name="ShippingStatus" value={item.CreatedOn.slice(0,10)} />
          <OrderField name="Order Total" value={item.OrderTotal} />
          

          

          
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailed;
