// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {useState,useEffect,useCallback} from 'react';
import {
  SafeAreaView,RefreshControl,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,FlatList,TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import * as RootNavigation from './RootNavigation.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { setUser, clearUser } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

//import {get_count_of_history_items_from_async_storage,getAsyncStoreData,remove_history_items_from_async_storage,get_history_items_from_async_storage} from 'utils/utils';

//import AiLogo from './svgComponents/AiLogo';
//import Bullet from './svgComponents/Bullet';

const CustomDrawer = ({ state, navigation, ...props}) => {

const isFocused = useIsFocused();

const [queryHistory,setQueryHistory] = useState(null);
const [refreshing, setRefreshing] = React.useState(false);

const [forcerefresh,setForceRefresh] = useState(false);

const [numItems,setNumItems] = useState(0);

const [loaded,setLoaded] = useState(false);
//console.log('myprops',props);
//console.log('nav',navigation);
//console.log('state',state);
const  usr  = useSelector(state => state?.user.userInfo);
let user = null;
console.log('tyoe of musr=',typeof usr);
if (!(usr instanceof Object)) {
    console.log('enering parse');
    user = JSON.parse(usr);
} else { user = usr; console.log('did no enter parse'); }



//const user = usr;


console.log('musr=',user.email);


const dispatch = useDispatch();





const logout_and_delete_account  = () => {





}


async function delete_account(email) {


     try { 

const url = 'https://fbadminapp.onrender.com/deleteUserByEmail' ;
            let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                 
            },
            body:JSON.stringify({'email':email})
          };
            const response = await fetch(url,options);
            const result = await response.json();
            console.log('delresponse>>',result);
            alert("User Account and Account Data deleted!")
              
            //  auth().signOut();  


            //

            
 } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }



}


const delete_user_account = () => {


 // const duser  = JSON.parse(user);
//console.log('mybod>>111',duser);
let body = {email:user.email};
console.log('mybod>>222',body);

AsyncStorage.removeItem("@yapUser").then(() => { 
  console.log('cleared');
});

delete_account(user.email);       

dispatch(clearUser());
auth().signOut();  


}


const do_logout = async () => {

console.log('sdas');

await AsyncStorage.removeItem("@yapUser").then(() => { 
  console.log('cleared');
  dispatch(clearUser());
  auth().signOut();  
});

  
}

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';


  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'rgb(154 52 18)',color:'#fff'}}>
      {/*Top Large Image */}
     


      <DrawerContentScrollView {...props} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } style={{color:'#fff'}}>
        

        <View style={{width:'99%'}}>





          
<Text style={{marginLeft:10,marginTop:10,fontSize:20,color:'#f5f5f5',fontFamily:'Quicksand-SemiBold',marginBottom:50}} >
Welcome </Text>

<Text style={{marginLeft:10,marginTop:10,fontSize:25,color:'#f5f5f5',fontFamily:'Quicksand-SemiBold',marginBottom:50}} >
{user.email} </Text>
          
          
              <TouchableOpacity 
 onPress={()=>{navigation.navigate('AppBottomStack', { screen: 'MoviesStack' ,params:{screen:'Search Imdb'} });}} 
                style={{backgroundColor:'rgb(124 45 18)',marginLeft:10,marginBottom:15,
                alignItems:'center',justifyContent:'center',width:180,height:45,borderWidth:1,borderColor:'#5f5f5',borderRadius:10 }} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-SemiBold'}}>
                  Imdb Movie Search</Text>
              </TouchableOpacity>
          

              <TouchableOpacity 
 onPress={()=>{navigation.navigate('AppBottomStack', { screen: 'AiChatBot'  });}} 
                style={{backgroundColor:'rgb(124 45 18)',marginLeft:10,marginBottom:15,
                alignItems:'center',justifyContent:'center',width:180,height:45,borderWidth:1,borderColor:'#5f5f5',borderRadius:10}} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-SemiBold'}}>
                  Google Gemini query</Text>
              </TouchableOpacity>

              <TouchableOpacity 
 onPress={()=>{navigation.navigate('AppBottomStack', { screen: 'MyCohere' });}} 
                style={{backgroundColor:'rgb(124 45 18)',marginLeft:10,marginBottom:15,
                alignItems:'center',justifyContent:'center',width:180,height:45,borderWidth:1,borderColor:'#5f5f5',borderRadius:10}} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-SemiBold'}}>Cohere AI query</Text>
              </TouchableOpacity>

<TouchableOpacity 
 onPress={()=>{ do_logout()  }} 
                style={{backgroundColor:'rgb(124 45 18)',marginLeft:10,marginBottom:5,marginTop:50,
                alignItems:'center',justifyContent:'center',width:180,height:45,borderWidth:1,borderColor:'#5f5f5',borderRadius:10}} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-SemiBold'}}>
                  Logout</Text>
              </TouchableOpacity>


<TouchableOpacity 
 onPress={()=>{ delete_user_account()  }} 
                style={{backgroundColor:'rgb(124 45 18)',marginLeft:10,marginBottom:5,marginTop:150,
                alignSelf:'flex-start',alignItems:'center',justifyContent:'center',width:300,height:45,borderWidth:1,borderColor:'#5f5f5',borderRadius:10}} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-SemiBold'}}>
                  Delete User and Account Data</Text>
              </TouchableOpacity>

          
        </View>




      </DrawerContentScrollView>
      

      <Text
        onPress={() => setLoaded(!loaded)}
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'white'
        }}>
        https://sanjeevdg.github.io/
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawer;
