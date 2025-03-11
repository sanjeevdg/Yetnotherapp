import React, { useState,useEffect } from 'react';

import LottieSplashScreen from "react-native-lottie-splash-screen";


import AppNavigation from './src/nav/AppNavigation';


import auth from '@react-native-firebase/auth';

//import { PersistGate } from 'redux-persist/integration/react';
import { store } from './src/redux/store';
//import { useSelector, useDispatch } from 'react-redux';
//import { setUser } from './src/redux/actions';
import { Provider } from 'react-redux';
import { DefaultTheme } from '@react-navigation/native';
import {LogBox,Dimensions} from 'react-native';

const App = () => {


  useEffect(() => {
    LottieSplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);


//
//clicked? styles.pullHigher:'',, clicked?styles.bgTransparent:'']
//,clicked?styles.bgTransparent:''
// injectedJavaScript={}       setLoading(true);
const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
//const { user } = useSelector(state => state.user.userInfo);
// const dispatch = useDispatch();
/*
const handleSetUser = user => {
    setUser(user);
  };
*/
const theme = {
  ...DefaultTheme,  
     colors
: {
    ...DefaultTheme.colors,    
    background: 'rgb(241 245 249)',
  },
  dark:true,
}
/*
function onAuthStateChanged(user) {
    setUser(user);
    console.log('aaaaaaaaa-my-user-in-app>>>',user);
    if (initializing) setInitializing(false);
  }
*/
 



/*

<PersistGate loading={null} persistor={persistor}>

</PersistGate>

*/


  return (

 
      
<Provider store={store}>

<AppNavigation/>

</Provider>



  );
};

export default App;
