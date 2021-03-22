import React,{useEffect, useState} from 'react'
import {View,Text, ScrollView, ActivityIndicator,Alert} from 'react-native'
import ProductListing from '../../COMPONENTS/Products/ProductList'
import {categories, products} from '../../DummyData/Categories'
import {useDispatch, useSelector} from 'react-redux'
import * as productAction from '../../Redux/Action/Products'
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import SuccessScreen from '../../COMPONENTS/UI/SuccessScreen'
import { colors } from '../../Constant'
import * as cartActions from '../../Redux/Action/Cart'
const Listing = ({route, navigation}) =>{
    const [isLoading, setIsLoading] = useState(true)

    const userId = useSelector(state=>state.Auth.Login.customerId)
    const isFocused = useIsFocused()

    const productsAvailable = useSelector(state=>state.Product.catProducts)


    const dispatch = useDispatch()
  
    const fetchProducts = async() =>{
        setIsLoading(true)
        
        console.log(route.params?.id)
  await dispatch(productAction.fetchProductFunc(route.params?.id))
  navigation.setOptions({headerTitle:route.params?.name + ` - (${productsAvailable.length})`})
  setIsLoading(false)
    }
  
    // FETCH CATEGORIES
    useEffect(()=>{
  fetchProducts()
    },[isFocused])


// ADD TO CART HANDLER
const addToCardHandler = async (item) =>{
  setIsLoading(true);

  try {
    const response = await fetch(
      `http://skybluewholesale.com:80/api/CatalogApi/AddProductToCart?customerId=${userId}&productId=${item.ProductPrice.ProductId}&quantity=1`,
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
    Alert.alert('Successfully Add', 'Product successfully add to cart')
    await dispatch(cartActions.fetchCountCart())
  } catch (err) {
    Alert.alert('Something went wrong!', err.message);
  }
  setIsLoading(false);
}




    return (
        
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
        <View style={{flex:1}}>
        {isLoading ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={23} color={colors.Blue}/>
        </View> :
        (
            <View style={{flex:1,}}>
                {productsAvailable.length === 0 ? 
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <SuccessScreen
                widthNeed
                  width={200}
                  height={200}
              
                //   onPress={() => props.navigation.navigate("Home")}
                  imageUrl={require("../../assets/Icons/confirm.png")}
                  title="NO PRODUCT FOUND"
                  description="Sorry we are unable to find any product."
                />
                </View>
                
                
                :(
                    <View style={{width:'100%', flexDirection:'row', paddingHorizontal:25, justifyContent:'space-between', paddingTop:20, flexWrap:'wrap'}}>
                            {productsAvailable.map((item, index)=> (
                                <ProductListing
                                Listing
                                onPress={()=> navigation.navigate('Detailed',{item: item})}
                                key={index}
                                imageUri={{uri: item.PictureModels.PictureModels[0]?.ImageUrl}}
                                title={item.Name}
                                description={item.ShortDescription}
                                price={`${item.ProductPrice.Price}`}
                                imageUriSec={require('../../assets/Icons/shopping-bag.png')}
                                widthSec={20}
                                heightSec={20}
                                onPressSec={()=> addToCardHandler(item)}
                             
                                
                              />
                              
                                     ))}
                                     </View>
                )
                }
    
            </View>
        ) }
            
        </View>
        </ScrollView>
    )
}

export default Listing