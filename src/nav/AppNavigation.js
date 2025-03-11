import React, { useState,useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MoviesSearch from '../screens/MoviesSearch';
import MovieDetail from '../screens/MovieDetail';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AiChatBot from '../screens/AiChatBot';
import MyCohere from '../screens/MyCohere';


import {LogBox,Dimensions} from 'react-native';
import CustomDrawer from '../CustomDrawer';
import { navigationRef } from '../RootNavigation';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MtIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {Text, View,Image} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUser,clearUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const MoviesStack = () => {
   
    return (
      <Stack.Navigator initialRouteName="Search Imdb"  screenOptions={{headerStyle: {
      backgroundColor: 'rgb(194 65 12)'} ,headerTitleStyle: {
    color: 'white'
  },headerTintColor: 'white'
    }}>
         <Stack.Screen name="Search Imdb" component={MoviesSearch} />
         <Stack.Screen name="MovieDetail" component={MovieDetail} />

      </Stack.Navigator>
    )
}

function AppBottomStack() {
    return (
        <BottomStack.Navigator >
            
<BottomStack.Screen options={{
      tabBarLabel: 'Imdb',
      tabBarIcon: ({ color, size }) => (
        <MtIcon name="local-movies" color={color} size={size} />
      ),
      headerShown: false,
      headerStyle: {
      backgroundColor: 'rgb(194 65 12)'
    }
    }}
     name="MoviesStack" component={MoviesStack} />


            <BottomStack.Screen
               options={{
      tabBarLabel: 'Gemini',
      tabBarIcon: ({ color, size }) => (
        <FaIcon name="language" color={color} size={size} />
      ),
      headerStyle: {
      backgroundColor: 'rgb(194 65 12)'} ,headerTitleStyle: {
    color: 'white'
  },headerTintColor: 'white',headerShown:false,
    }}
     
              name='AiChatBot'
                component={AiChatBot}

            />
            <BottomStack.Screen
       options={{
      tabBarLabel: 'Cohere',
tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 35, height: 35 }}
                  source={
                    require('../../assets/images/ailogo.jpg')
                  }
                />
              );
            },
      headerShown:false,
    }}
                name='MyCohere'
                component={MyCohere}
            />
      



        </BottomStack.Navigator>
    )
}


function LoggedInNavigator(){

 return (      <Drawer.Navigator detachInactiveScreens={false}  
       
        screenOptions={{
        drawerStyle: {
        backgroundColor: 'rgb(241 245 249)',
        width: Dimensions.get('window').width,
        },
            }}
        screenOptions={{headerShown: false}}     
        useLegacyImplementation={false} 
        drawerContent={props => <CustomDrawer {...props} />}>

            <Drawer.Screen name='AppBottomStack' component={AppBottomStack} />
            
        </Drawer.Navigator>
        )

}


function LoginNavigator() {

return (

 <Stack.Navigator initialRouteName="Login"  screenOptions={{headerStyle: {
      backgroundColor: 'rgb(194 65 12)'} ,headerTitleStyle: {
    color: 'white'
  },headerTintColor: 'white',headerShown:false
    }}>
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Signup" component={Signup} />

      </Stack.Navigator>
)


  }


export default function AppNavigation() {

const dispatch = useDispatch();


//try {
//const selUser = state => state?.user?.userInfo;
const  user  = useSelector(state => state?.user.userInfo);
console.log('my rdxuser>>',user);
//}
//catch (e) { console.log('er>>',e)}


const [muser,setMuser] = useState(null);

const theme = {
  ...DefaultTheme,  
     colors
: {
    ...DefaultTheme.colors,    
    background: 'rgb(241 245 249)',
  },
  dark:true,
}

 useEffect(() => {

    try {
    
    AsyncStorage.getItem('@yapUser').then((res) => {

    	if (res) {
      console.log('resval=',res);
      dispatch(setUser(res));
    setMuser(res);
        
        console.log('setting redux user');

console.log('getting redux user',user);
	
      console.log('async contains-->',res);
} else {dispatch(clearUser());
            console.log('async contains-->',res);
}


    });
   // console.log('async contains-->',jsonValue);
    
  } catch(e) {
    // error reading value
    console.log('error reading from async storage',e);

  }






  //  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //  return subscriber; // unsubscribe on unmount
  }, [user]);



return (
	<NavigationContainer>

{user? <LoggedInNavigator/> : <LoginNavigator/>}    
   </NavigationContainer>

	);



}