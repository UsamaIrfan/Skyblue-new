import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ColorPropType } from "react-native";
import ImageComp from '../../COMPONENTS/UI/Image'
import {colors as Color, colors} from "../../Constant";

const CartProductRow = props => {
  // console.log(quantityalraedy);
  // console.log(props.quantity);
  const [quantity, setQuantity] = useState();
  const [subquantity, setsubQuantity] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  // useEffect(() => {
  //   setQuantity(props.quantity);
  //   console.log("we are running and quanity is " + props.quantity);
  // }, []);

  const setQuantityHandler = useCallback(async () => {
    await setQuantity(props.quantity);
  }, []);

  useEffect(() => {
    setQuantityHandler();
  }, []);
  const quantityHandler = useCallback(
    quan => {
      let quantemp = 0;
      if (props.checkout) {
        return;
      }
      // console.log("i m called");
      // console.log(quantity);
      // console.log(subquantity);
      // console.log(quan);
      if (quan === "minus") {
        if (quantity > 0) {
          setQuantity(quantity - 1);
          setsubQuantity(subquantity - 1);
          quantemp = quantity - 1;
        }
      } else {
        setsubQuantity(subquantity + 1);
        setQuantity(quantity + 1);
        quantemp = quantity + 1;
      }
      sendQuan(quantemp);
    },
    [quantity]
  );

  const sendQuan = quan => {
    console.log(quan);
    props.quantityReturnBack(quan, props.id);
  };

  // useEffect(() => {
  //   if (props.checkout) {
  //     return;
  //   }
  //   if (quantity) {
  //     console.log("motherfucker i m called");
  //     props.quantityReturnBack(quantity, props.id);
  //   }
  // }, [quantity]);

//   useEffect(() => {
//     if (props.checkout) {
//       return;
//     } else {
//       const willFocusSub = props.navigation.addListener(
//         "willFocus",
//         setQuantityHandler
//       );
//       console.log("i m running second");

//       return () => {
//         willFocusSub.remove();
//       };
//     }
//   }, [setQuantityHandler]);

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,

        flexDirection: "row"
      }}
    >
      <View
        style={{
          width: "30%",
          height: 110,
          backgroundColor: "white"
        }}
      >
        <ImageComp Icon imageUri={props.imageUrl} width="100%" height="100%" />
      </View>

      <View style={{ width: "70%", paddingLeft: 10 }}>
        <View
          style={{
            width: "100%",
            paddingLeft: 10,
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems:"flex-start"
          }}
        >
          <View style={{ width: "85%" }}>
            <Text style={{ fontSize: 16 }}>{props.title}</Text>
          </View>

          {props.checkout  ? null : (
            <ImageComp
            style={{marginTop:10}}
              imageUri={require("../../assets/Icons/cancel.png")}
              onPress={props.onPressCancel}
              width={17}
              height={17}
            />
          )}
          {props.cancel  ? <ImageComp
            style={{marginTop:10}}
              imageUri={require("../../assets/Icons/cancel.png")}
              onPress={props.onPressCancel}
              width={17}
              height={17}
            /> : null}
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            paddingLeft: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          {props.checkout ? (
            <Text style={{ fontSize: 17, color: Color.primary }}>
              Qty: {props.quantity}
            </Text>
          ) : (
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor:colors.Blue,
                borderRadius:125,
                paddingHorizontal:12,
                height:40

              }}
            >
              <ImageComp
              Icon
                imageUri={require("../../assets/Icons/minus.png")}
                onPress={() => quantityHandler("minus")}
                width={15}
                height={15}
              />
              <Text style={{ fontSize: 17, color:'white' }}>{quantity}</Text>
              <ImageComp
                imageUri={require("../../assets/Icons/plus.png")}
                onPress={() => quantityHandler("add")}
                width={15}
                height={15}
              />
            </View>
          )}
          <Text style={{ fontSize: 18, color: Color.primary }}>
            {props.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartProductRow;
