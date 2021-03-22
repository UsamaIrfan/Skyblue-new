import React from 'react'
import {Text, View} from 'react-native'
import ImageComp from '../COMPONENTS/UI/Image'

export const TabComponent =(route) =>{
    let iconName
    if (route === "Home") {
       iconName=   <ImageComp
          noPress
            Icon
            width={22}
            height={22}
            imageUri={require("../assets/Icons/Tab/home.png")}
          />  
    }else if(route === "Shop"){
      iconName=<ImageComp
      noPress
        Icon
        width={22}
        height={22}
        imageUri={require("../assets/Icons/Tab/shop.png")}
      />  
    }
    else if(route === "Bag"){
      iconName=<ImageComp
      noPress
        Icon
        width={22}
        height={22}
        imageUri={require("../assets/Icons/Tab/bag.png")}
      />  
    }
    else if(route === "Account"){
      iconName=<ImageComp
      noPress
        Icon
        width={22}
        height={22}
        imageUri={require("../assets/Icons/Tab/account.png")}
      />  
    }

      // You can return any component that you like here!
      return iconName;
}