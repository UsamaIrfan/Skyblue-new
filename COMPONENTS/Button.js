import { useLinkProps } from '@react-navigation/native';
import React, { Component } from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native'
import {colors} from '../Constant'


const Button =(props) =>{
    return (
        <TouchableOpacity
              disabled={props.isValid}
              // onPress={() =>
              //   navigation.navigate("MainDrawer", {
              //     name: "CustomerListStack",
              //   })
              // }
              onPress={props.onPress}
              style={{
                width: props.Small ? "60%": "80%",
                height: props.Small ? 50:55,
                backgroundColor: props.isValid ? colors.Grey : (props.color ? props.color : colors.Blue) ,

                justifyContent: "center",
                alignItems: "center",
                marginBottom: props.marginBottom ? 10 : null,
                borderRadius:125
              }}
            >
              {props.isLoading ? (
                <ActivityIndicator color="white" size={20} />
              ) : (
                <Text style={{  color: "white", fontFamily:'Regular', fontSize: 15,
                color: "white",
                fontFamily: "Bold",
                textTransform: "uppercase",
                letterSpacing: 0.6, }}>{props.Text}</Text>
              )}
            </TouchableOpacity>

    )
}
export default Button