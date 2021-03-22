import React from 'react'
import {View,Text,Dimensions, TouchableOpacity,ActivityIndicator} from 'react-native'
import {SubCategoriess, products} from '../../DummyData/Categories'
import ImageComp from '../../COMPONENTS/UI/Image'
import { useEffect, useState } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import {colors} from '../../Constant'
import { ScrollView } from 'react-native-gesture-handler'

const {width, height} = Dimensions.get('window')

const SubCategories = ({route, navigation}) =>{
    const [subCat, setSubCat] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const categoriesFetch = useSelector(state=>state.Product.Products)
  // console.log(categoriesFetch)

  const isFocused = useIsFocused()
    useEffect(()=>{
      setIsLoading(true)
  const filterProduct = categoriesFetch.find(item=>item.Id ===route.params?.id )

  navigation.setOptions({headerTitle:filterProduct.Name})
  setSubCat(filterProduct.SubCategoryItems)
  setIsLoading(false)
    },[isFocused])


    const setSubSubCategoriesHandler = (item) =>{
  console.log(item)
        if(item.SubCategoryItems?.length === 0) {
          navigation.navigate('Listing',{id: item.Id, name:item.Name})
          console.log('GO TO LISTING  COMPONENT (CHILD)')
          // navigation.navigate('Shop',{screen: 'Listing' , params:{id: item.Id}})
        }else{
          console.log('Go to Details COMPONENT (CHILD)')
          setSubCat(item.SubCategoryItems)
          // navigation.navigate('Shop', {screen:'SubCategories', params:{id:item.Id}})
        }
          
    }


    return (
      <ScrollView>
        <View style={{flex:1}}>
          {isLoading ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={23} color={colors.Blue}/>
        </View> : (
 <View style={{ flexDirection:'row', flexWrap:'wrap', paddingHorizontal:15, justifyContent:'space-between'}}>
              
 {subCat.map((item,index)=> (
   <TouchableOpacity onPress={()=> setSubSubCategoriesHandler(item)} key={item.Id} style={{width: width /2.3,marginTop:25 }}>
     <View style={{width: width /2.3, height: 100, backgroundColor:'#e5e5e5',  }}>
     <ImageComp noPress width={'100%'} height={'100%'} imageUri={{uri:item.PictureUrl}}/>
     </View>
     <Text style={{fontFamily:'Bold', color: '#484848', textAlign:'center', marginTop:5, lineHeight:18}}>{item.Name}</Text>
   </TouchableOpacity>
 ))}
</View>
          )}
            
        </View>
        </ScrollView>
    )
}

export default SubCategories