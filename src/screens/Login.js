import React, { memo,Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,ScrollView,ImageBackground,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox, KeyboardAvoidingView,StatusBar,
  useWindowDimensions
} from 'react-native';

import auth from '@react-native-firebase/auth';
// import { TabView, SceneMap } from 'react-native-tab-view';

//import { Tabs } from 'react-native-collapsible-tab-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Badge,Divider,Input,Card,Button,Dialog,Icon} from '@rneui/themed';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import AdIcon from 'react-native-vector-icons/AntDesign';

import { styles } from "./Styles2";
import {
  GoogleSignin,GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


export default function Login({ route, navigation}) {


//const { user } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

 const dimensions = Dimensions.get('window');
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;

const [email,setEmail ] = useState('');
const [password,setPassword] = useState('');

const [recoveremail,setRecoverEmail] = useState('');
 
const [dlgopen, setDlgOpen] = useState(false);

const [isPasswordSecure, setIsPasswordSecure]  = useState(true);

const [emailerror,setEmailError] = useState('');

const [recoveremailerror,setRecoverEmailError] = useState('');

//const [user,setUser] = useState();

const [initializing,setInitializing] = useState(true);

/*
  const handleSetUser = user => {
    setUser(user);
  };
*/

const sign_in = async() => {

if (!validateEmail(email))  {

  setRecoverEmailError('Please enter  valid email address!');
  return;
  //alert('sdsdasd');
}


auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    saveUser(email);  
    console.log('User account created & signed in!');

  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
      console.log('That email address is invalid!');
    } 
    alert('Error:'+error);
    console.error(error);
  });


console.log('sdsa asda');

}


function onAuthStateChanged(user) {
    if (user)       
    console.log('aaaaaaaaa-got-user-in-login',user);
   // navigation.navigate('LoggedInNavigator',{screen:'AppBottomStack'} );

    if (initializing) setInitializing(false);

  }


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


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);



async function google_signin() {

// '1036382000512-999040v4ul61vqpl26it38nvnh527ifm.apps.googleusercontent.com'
  //562775885736-mbvn25envr1311lm6m1182tk02v2364q.apps.googleusercontent.com
//1036382000512-jmlrksnhi4fbc0pkmnquuupn0ghl73p7.apps.googleusercontent.com  
  //1036382000512-999040v4ul61vqpl26it38nvnh527ifm.apps.googleusercontent.com
GoogleSignin.configure({

  webClientId:''
});

console.log('sadasda');

  try {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
    console.log('sadasda22222222333333333');    
  
    const response =  await GoogleSignin.signIn().catch((error: Error) => {
      // By default these errors are completely silent :-/
      console.error('caught n error>>',error);
    });

    console.log('resp>>>',response);
    if (response.type === 'success') {
                                        saveUser(response.data.user.email);
                                        console.log('login-success');
                                        
                                       }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
        // some other error happened
      }
      console.log('error caught >>aaaaa>',error);
    } else {
      // an error that's not related to google sign in occurred
      alert('Error:',error);
      console.log('error caught >>>',error);
    }

console.log('caught error',error);

  }
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



const forgotPassword = () => {

console.log('recover-rml=',recoveremail);

if (!validateEmail(recoveremail))  {

  setRecoverEmailError('Please enter  valid email address!');
  return;
  //alert('sdsdasd');
}
else {
  setRecoverEmailError('');
}




    auth().sendPasswordResetEmail(recoveremail)
      .then(function (user) {
        alert('Please check your email...');
        setDlgOpen(false);
      }).catch(function (e) {
        console.log(e)
      })
  }

const toggleDlg = () => {

  setDlgOpen(!dlgopen);
  setEmailError('');
}

//forgotPassword('sanjeev.dasgupta@gmail.com')

/*
<Card style={{flex:1,display:'flex'}} >
<TouchableOpacity style={{display:'flex',marginTop:20,marginBottom:20,flexDirection:'row',height:40,
alignSelf:'center',width:300,backgroundColor:'white',borderRadius:20}} 
onPress={() => google_signin()}
>
  
   <Image style={{marginRight:10,marginLeft:50,marginTop:8,width:25,height:25}} source={require('../../assets/images/search.png')} />
<Text style={{fontSize:18,fontFamily:'JosefinSans-SemiBold',marginTop:6,textAlign:'center'}} >  


  Sign in with Google


</Text>  
  
</TouchableOpacity>
*/

return (

<SafeAreaView style={{flex: 1 , flexDirection:'column',alignItems:'center',justifyContent:'center',alignSelf:'center',height:screenHeight}} >


 <ImageBackground source={require('../../assets/images/rm222-mind-14.jpg')} resizeMode="cover" style={{flex: 1 ,width:screenWidth}}>

<View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:160}} >
<Text style={{fontSize:30,lineHeight:40,fontFamily:'JosefinSans-SemiBold',marginBottom:20}} >Please Login</Text>

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
          errorStyle={{textAlign:'center',fontFamily:'JosefinSans-Regular',fontSize:14}}
          errorMessage={emailerror}
          inputContainerStyle=
                        {{borderColor:'black',alignSelf:'center',width:'80%',height:45,borderWidth:1,borderRadius:20}}
          inputStyle={{display:'flex',fontSize:16,fontFamily:'JosefinSans-Regular',textAlign:'center'} }
        />  

</View>

<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',alignSelf:'center'}} >
	
<Text style={{fontSize:20,width:'30%',lineHeight:27,color:'black',fontFamily:'JosefinSans-SemiBold'}} > Password </Text>


 <Input
          editable
          secureTextEntry={isPasswordSecure}
          rightIcon={ <AdIcon name={isPasswordSecure ? "eyeo" : "eye"} size={25} 
                          onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                          color={'black'} />                          
                      }          
          numberOfLines={4}
          placeholder="Enter password"
          maxLength={40}
          onChangeText={text => setPassword(text)}
          value={password}
          inputContainerStyle=
                        {{borderColor:'black',width:'80%',alignSelf:'center',height:45,borderWidth:1,borderRadius:20}}
          inputStyle={{display:'flex',fontSize:16,fontFamily:'JosefinSans-Regular',fontSize:16,textAlign:'center'} }
        />  

</View>



<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'center',marginBottom:20}} >
<TouchableOpacity onPress={() => sign_in()}
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
     }} ><AdIcon name="login" color={'white'} size={25} />
     <Text style={{alignSelf:'center',fontSize:20, color:'white',fontFamily:'JosefinSans-SemiBold'}} >   Login</Text>  
</TouchableOpacity>



</View>


<TouchableOpacity onPress={()=> {setDlgOpen(true)}  }
  style={{display:'flex',marginTop:6,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(202 138 4)',borderRadius:15}} >


<Text style={{fontSize:14,color:'white',fontFamily:'JosefinSans-SemiBold',textAlign:'center'}} >Forgot Password?</Text> 

</TouchableOpacity>

  <Dialog
      isVisible={dlgopen}
      onBackdropPress={toggleDlg}
    >
      <Dialog.Title titleStyle={{fontSize:18,fontFamily:'JosefinSans-SemiBold'}} title="Provide your email"/>
      <Text>We'll send you a password reset link if your email is in our records.</Text>

<Input
          editable
          multiline
          secureTextEntry
          numberOfLines={4}
          placeholder="Email"
          maxLength={40}
          errorStyle={{textAlign:'center',fontFamily:'JosefinSans-Regular',fontSize:14}}
          errorMessage={recoveremailerror}

          onChangeText={text => setRecoverEmail(text)}
          value={recoveremail}
          inputContainerStyle=
                        {{borderColor:'black',width:'100%',alignSelf:'center',height:40,borderWidth:1,borderRadius:20,marginTop:30}}
          inputStyle={{display:'flex',fontSize:16,fontFamily:'JosefinSans-Regular',textAlign:'center'} }
        />  


<TouchableOpacity onPress={() => forgotPassword() }
  style={{display:'flex',marginTop:6,marginBottom:8,height:35,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:200,backgroundColor:'rgb(202 138 4)',borderRadius:15}} >


<Text style={{fontSize:14,color:'white',fontFamily:'JosefinSans-SemiBold',textAlign:'center'}} >Send password reset email</Text> 

</TouchableOpacity>



    </Dialog>






<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex:99
  }}
/>

<Divider style={{height:5, backgroundColor: 'blue'}} />


<Text>Or</Text>

<TouchableOpacity style={{display:'flex',marginTop:20,marginBottom:20,flexDirection:'row',height:40,
alignSelf:'center',width:300,backgroundColor:'white',borderRadius:20}} 
onPress={() => google_signin()}
>
  
   <Image style={{marginRight:10,marginLeft:50,marginTop:8,width:25,height:25}} source={require('../../assets/images/search.png')} />
<Text style={{fontSize:18,fontFamily:'JosefinSans-SemiBold',marginTop:6,textAlign:'center'}} >  


  Sign in with Google


</Text>  
  
</TouchableOpacity>

<Text>Don't have an account? </Text>
<Badge value="Sign Up!" onPress={()=>navigation.navigate('Signup')} status="primary"/>

</View>



</ImageBackground>

	</SafeAreaView>




	)




}