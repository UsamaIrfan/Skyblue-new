import { createStackNavigator } from "@react-navigation/stack";
import {colors} from '../Constant'
import Categories from '../Screens/Shop/Categories'
import React from 'react'
import SubCategories from "../Screens/Shop/SubCategories";
import Listing from "../Screens/Shop/Listing";
import Detailed from "../Screens/Shop/Detailed";
import {View} from 'react-native'
import ImageComp from '../COMPONENTS/UI/Image'
import ViewCart from "../Screens/Checkout/ViewCart";



// HOME STACK NAVIGATOR
const ShopNavigator = createStackNavigator();

export const ShopNavigatorFunc = () => {
  return (

        <ShopNavigator.Navigator
          // initialRouteName="PriceOffer
          screenOptions={{
            headerTitleAlign:'center',
            headerTitleStyle:{fontFamily:'Bold', fontSize:17,letterSpacing:1},
            headerStyle:{
            backgroundColor:colors.Blue,
            
            
        },
     
    headerTintColor:'white',
headerTitle:'CATEGORIES' }}
     
        >
            <ShopNavigator.Screen
            name="Categories"
            component={Categories}
            options={({navigation})=> ({
              headerLeft:()=> (
                <View style={{ flexDirection: "row" }}>
              <View
                style={{
         
                  height: "70%",
                  paddingLeft:15,
            
    
                  justifyContent: "flex-end",
                }}
              >
              
              </View>
              <ImageComp
                onPress={() => navigation.navigate("Home", {screen: 'BarCode'})}
               
                Icon
                width={27}
                height={27}
                imageUri={require("../assets/Icons/qr-code.png")}
              />
             
            </View>
              ) 
            })}
    
          />
            <ShopNavigator.Screen
            name="SubCategories"
            component={SubCategories}
            options={{headerTitle:'SUB CATEGORIES'}}
           
          />
              <ShopNavigator.Screen
            name="Listing"
            component={Listing}
            options={{headerTitle:'PRODUCT LISTING'}}
           
          />
              <ShopNavigator.Screen
            name="Detailed"
            component={Detailed}
            options={{headerTitle:'SUB CATEGORIES',
            headerTitle:null,
            
          }}
           
          />
     
          
        
            
         
          
        </ShopNavigator.Navigator>
   
  
  );
};



// HOME STACK NAVIGATOR ENDS HERE
