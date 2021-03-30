import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ColorPropType, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageComp from "../../COMPONENTS/UI/Image";
import { colors as Color, colors, MaterialIcons } from "../../Constant";

const {width} = Dimensions.get("window")

const CartProductRow = (props) => {
  const [quantity, setQuantity] = useState();
  const [subquantity, setsubQuantity] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const setQuantityHandler = useCallback(async () => {
    await setQuantity(props.quantity);
  }, []);

  useEffect(() => {
    setQuantityHandler();
  }, []);
  const quantityHandler = useCallback(
    (quan) => {
      let quantemp = 0;
      if (props.checkout) {
        return;
      }
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

  const sendQuan = (quan) => {
    props.quantityReturnBack(quan, props.id);
  };

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,

        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "30%",
          height: 110,
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden"
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
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "85%" }}>
            <Text style={{ fontSize: 16 }}>{props.title}</Text>
          </View>

          {props.checkout ? null : (
            <MaterialIcons name="cancel" size={24} color={Color.Blue} />
          )}
          {props.cancel ? (
            <MaterialIcons
              onPress={props.onPressCancel}
              name="cancel"
              size={24}
              color={Color.Blue}
            />
          ) : null}
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            paddingLeft: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {props.checkout ? (
            <>
              <Text style={{ fontSize: 17, color: Color.primary }}>
                Qty: {props.quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  props.ModalDataHandler(props.allowedQuantities, props.id)
                }
              >
                <Text
                  style={{
                    borderRadius: 8,
                    fontFamily: "Regular",
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    fontSize: width * 0.04,
                    backgroundColor: Color.Blue,
                    color: "#fff",
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.Blue,
                borderRadius: 125,
                paddingHorizontal: 12,
                height: 40,
              }}
            >
              <ImageComp
                Icon
                imageUri={require("../../assets/Icons/minus.png")}
                onPress={() => quantityHandler("minus")}
                width={15}
                height={15}
              />
              <Text style={{ fontSize: 17, color: "white" }}>{quantity}</Text>
              <ImageComp
                imageUri={require("../../assets/Icons/plus.png")}
                onPress={() => quantityHandler("add")}
                width={15}
                height={15}
              />
            </View>
          )}
          <Text
            style={{
              fontSize: width * 0.04,
              backgroundColor: Color.Blue,
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 8,
              color: "#fff",
              fontFamily: "Regular",
            }}
          >
            {props.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartProductRow;
