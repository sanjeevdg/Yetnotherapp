import React, { memo,Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,ScrollView,ImageBackground,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox, KeyboardAvoidingView,StatusBar,
  useWindowDimensions
} from 'react-native';


// import { TabView, SceneMap } from 'react-native-tab-view';

//import { Tabs } from 'react-native-collapsible-tab-view';


import {Badge,Divider,Input,Card,Button} from '@rneui/themed';

import FaIcon from 'react-native-vector-icons/FontAwesome';

import { styles } from "./Styles2";

import auth from '@react-native-firebase/auth';
import AdIcon from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux/userSlice';
import { useSelector,useDispatch } from 'react-redux';


export default function Signup({ route, navigation}) {

 const dimensions = Dimensions.get('window');
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;

const [email,setEmail ] = useState('');
const [password,setPassword] = useState('');


const dispatch = useDispatch();

async function saveUser(email) {

console.log('emailparam==',email);


 try {

dispatch(setUser({email:email}));   
    AsyncStorage.setItem('@yapUser', JSON.stringify({email:email})).then((resp) =>
{



  console.log('saved to async');
}
      );

  } catch (e) {
    // saving error
    console.log('error saving to async storage',e);
  }

      
}


const create_account = async() => {


auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    saveUser(email);
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });


console.log('sdsa asda');

}

/*
<Card style={{flex:1,display:'flex'}} >
*/

return (

<SafeAreaView style={{flex: 1 , flexDirection:'column',alignItems:'center',justifyContent:'center',alignSelf:'center',height:screenHeight}} >


 <ImageBackground source={require('../../assets/images/rm222-mind-14.jpg')} resizeMode="cover" style={{flex: 1 ,width:screenWidth}}>

<View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:200}} >

<Text style={{fontSize:30,lineHeight:40,fontFamily:'JosefinSans-SemiBold',marginBottom:20}} >Please Signup</Text>

<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',alignSelf:'center'}} >
	
<Text style={{fontSize:20,width:'30%',lineHeight:27,color:'black',fontFamily:'JosefinSans-SemiBold'}} > Email </Text>


 <Input
          editable
          multiline
          numberOfLines={4}
          placeholder="Enter email"
          maxLength={40}
          onChangeText={text => setEmail(text)}
          value={email}
          inputContainerStyle=
                        {{borderColor:'black',alignSelf:'center',width:'80%',height:45,borderWidth:1,borderRadius:20}}
          inputStyle={{display:'flex',fontSize:14,fontFamily:'JosefinSans-SemiBold',textAlign:'center'} }
        />  

</View>

<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',alignSelf:'center'}} >
	
<Text style={{fontSize:20,width:'30%',lineHeight:27,color:'black',fontFamily:'JosefinSans-SemiBold'}} > Password </Text>


 <Input
          editable
          multiline
          numberOfLines={4}
          placeholder="Enter password"
          maxLength={40}
          onChangeText={text => setPassword(text)}
          value={password}
          inputContainerStyle=
                        {{borderColor:'black',width:'80%',alignSelf:'center',height:45,borderWidth:1,borderRadius:20}}
          inputStyle={{display:'flex',fontSize:14,fontFamily:'JosefinSans-SemiBold',fontSize:16,textAlign:'center'} }
        />  

</View>



<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:50}} >
<TouchableOpacity onPress={() => create_account()}
  style={{
        backgroundColor: '#0984e3',
        borderRadius: 20,
        flexDirection:'row',
        height: 45,
        marginTop:20,
        marginTop:1,
        width:'60%',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
     }} ><AdIcon name="user" color={'white'} size={25} />
     <Text style={{alignSelf:'center',fontSize:20, color:'white',fontFamily:'JosefinSans-SemiBold'}} >Signup</Text>  
</TouchableOpacity>



</View>


<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex:99
  }}
/>

<Divider style={{height:5, backgroundColor: 'blue'}} />


<Text>Already have an account? </Text>
<Badge value="Sign In!" onPress={()=>navigation.navigate('Login')} status="primary"/>




</View>
</ImageBackground>

	</SafeAreaView>




	)




}