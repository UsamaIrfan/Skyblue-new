import React, { Component } from 'react';
import {View,Text} from 'react-native'
import ImageComp from '../UI/Image'

const EmptyScreen = (Props) =>{
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ImageComp
          Icon
          width={100}
          height={100}
          imageUri={Props.imageUri}
        />
        <Text style={{ fontSize: 18, marginTop: 10, fontFamily:'Bold' }}>
          {Props.Title}
        </Text>
        <Text style={{ fontSize: 15, marginTop: 5, fontFamily:'Regular', color:'#747474' }}>
          {Props.desc}
        </Text>
      </View>
    )
}
export default EmptyScreen