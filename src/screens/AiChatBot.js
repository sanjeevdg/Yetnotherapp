import React, { useState,useEffect } from 'react';

import {Dimensions,StyleSheet,ActivityIndicator,TextInput,SafeAreaView,TouchableOpacity,FlatList, ScrollView,Text,View} from 'react-native';

import {Input,Image} from '@rneui/themed';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import AdIcon from 'react-native-vector-icons/AntDesign';

import { WebView } from 'react-native-webview';

import markdownit from 'markdown-it';
import Clipboard from '@react-native-clipboard/clipboard';

import Prism from "prismjs";


const AiChatBot = ({ navigation,route }) =>  { 
  
const [searchTerm, setSearchTerm]   = useState();

const [movieItems,setMovieItems ] = useState();

const [loading,setLoading] = useState(false);
const [loaded,setLoaded] = useState(false);
const [result,setResult] = useState('');
const [rid,setRid] = useState();


const [inputHeight,setInputHeight] = useState(45);



/*

openweathermap.org api key
4a2ed27c3944fcdff7d4b2b93e0e44f0
4a2ed27c3944fcdff7d4b2b93e0e44f0

*/


const queryGemini = async () => {


let body = {contents:[{ parts: [{ text:searchTerm}]}]};
       
        try { 

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDzWG7rM7Aw2NDwCu46Nw3TystNbMtRmi8` ;
            let payload = {prompt:searchTerm}

            let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                 
            },
            body:JSON.stringify(body)
          }
            const response = await fetch(url,options);
            const result = await response.json();
            setResult(result.candidates[0].content.parts[0].text);
            setLoading(false);setLoaded(true);
console.log('RESULT>>>',JSON.stringify(result.candidates[0].content.parts[0].text));
            
 } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }

}



/*

<><Text style={{fontSize:25,fontFamily:'JosefinSans-SemiBold',marginLeft:15}} >Answer:</Text>
<Text style={{marginLeft:15 ,marginRight:15,fontSize:18,lineHeight:22 ,color:'black',fontFamily:'JosefinSans-Regular'}} >
 {result} </Text>

*/
const md2 = markdownit({
    highlight(str, lang) {
    let hl;
//console.log('prism-langsfor jsx==',Prism.languages['javascript']);
    // data-line="2"
    //lang !== 'markdown' &&
    try {
      if ( !(lang === 'undefined')   || (lang !== 'markdown')) {
        if(lang === 'jsx')  lang = 'javascript';
        if(lang === 'undefined') lang = 'javascript';
        if (lang === 'null') lang = 'javascript';
      hl = Prism.highlight(str, Prism.languages[lang]);
      }
    } catch (error) {
      console.error(error);
      hl = md2.utils.escapeHtml(str);
    }
//console.log('transformed markdown==',hl);
//console.log('language passed',lang); language-${lang}
    return `<pre style="white-space:pre-wrap !important;" data-line="1" class="line-numbers"><code style="white-space:pre-wrap !important;" class="language-${lang}">${hl}</code></pre>`;
  },
  typographer:true,
});



const loadHtml = () => { 

let myhstr =`<!DOCTYPE html>
  <html lang="en" data-bs-theme="dark">
  <head>
    
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
     <link rel="stylesheet" href="https://sanjeevdg.github.io/tailwind.css">
   <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
<script src="https://use.fontawesome.com/c6435311fd.js"></script>

<link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css">
   
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.min.css"></link>    
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />

  <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

    <style>
          body { background-color: white; color: black;margin:0 auto; 
          font-size: 90%;font-family:Quicksand;white-space:pre-wrap; }
          p {margin-left:5px;}
          pre {margin-left:5px;}
          h1 {font-size:60px;}   
          h2 {font-size:50px;}   
          h3 {font-size:40px;}  
          h4 {font-size:30px;}  



code[class*="language-"],
pre[class*="language-"] {
  font-size: 90%;font-family:Quicksand
}
      </style>

 
  </head>

  <body class="line-numbers" style="font-size: 50px"><span style="font-weight:bold;font-size:50px;font-family:JosefinSans-Regular" >Answer</span>`;

myhstr += md2.render(result);


myhstr +=  `</div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.js"></script>
    



<script>




    document.addEventListener('DOMContentLoaded', function() {

      // Function to send message to React Native
      function sendMessageToReactNative(message) {
        window.ReactNativeWebView.postMessage(message);
      }

      // Example of sending a message to React Native
    //  sendMessageToReactNative('Hello from the Web!');

      // Function to handle messages from React Native
      window.ReactNativeWebView.onMessage = function(event) {
        alert('Message from React Native: ' + event.data);
      };
    });
    type Message = { action: string; payload: any };

function sendMessageToRN(message: Message) {
  window.ReactNativeWebView.postMessage(message);
}
  </script>


<script>
$( document ).ready(function() {
  
  $("#mycopybtn").click(function(){
      $("#mysharebtnspan").text('copied!');
          setTimeout(function(){
              $('#mysharebtnspan').text('');
          }, 2000);


  });



</script>  


  </body>

  </html>`;

  return myhstr;

}

function displaySpinner() {
  return (
     <View style={[styles.indicatorWrapper,{marginTop:-1000,flex:1,flexGrow:1,height:600} ]}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading response...</Text>
    </View>
  );
}



// Clipboard.setString(origmarkRef.current);
  return (
<>
 
 <SafeAreaView style={styles.container}>


<Text style={{backgroundColor:'orange',fontSize:25,fontFamily:'JosefinSans-SemiBold',marginBottom:10,paddingBottom:5,textAlign:'center'}} >
  Google Gemini Query 
</Text>


<View style={{display: 'flex',flexDirection: 'column',width: '100%',marginTop:15 }} >

 <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="  Ask me anything!"
          maxLength={500}
          onChangeText={text =>  setSearchTerm(text)}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
           value={searchTerm}
          style={{maxHeight:100,fontSize:18,fontFamily:'JosefinSans-Regular',borderColor:'black',width:'95%',height:inputHeight,borderWidth:1,alignSelf:'center',borderRadius:22}}
          inputStyle={{display:'flex'} }
        />  


<TouchableOpacity onPress={() => {setLoading(true); setLoaded(false); queryGemini();} }
  style={{
        backgroundColor: '#0984e3',
        borderRadius: 22,
        flexDirection:'row',
        height: 45,
        marginLeft:1,
        marginTop:20,
        width:'60%',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
     }} ><FaIcon name="search" color={'white'} size={25} />
     <Text style={{fontSize:20, color:'white',fontFamily:'JosefinSans-SemiBold'}} >  Query Gemini</Text>  
</TouchableOpacity>

{loaded &&  <AdIcon name="copy1" onPress={() => {Clipboard.setString(result);}  } style={{marginBottom:30}}  color={'black'} size={30} /> }
</View>

      </SafeAreaView>


{loading && ( <ActivityIndicator size="large" color="#0984e3" style={{marginTop:-200,}} />)}
  {loaded && (<View style={{flex:1,marginTop:-250,marginBottom:-20}} ><WebView  originWhitelist={['*']}
          source={{ html: loadHtml() }}
            scalesPageToFit={true}
         startInLoadingState={true}
         renderLoading={() => {
        return displaySpinner();
      }}
         javaScriptEnabled={true}
         allowFileAccess={true}         
          domStorageEnabled={true}
          style={{flexGrow:1,marginTop:0,marginLeft:8,marginRight:8,paddingTop:5,marginBottom:0,fontSize:15}}        
></WebView></View>)}
  
 


</>    



);
      }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

   indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginTop:-57,
    height:Dimensions.get('window').height,
  },
  indicator: {},
  indicatorText: {
    fontSize: 18,
    color:'#f5f5f5',
    marginTop: 12,
  },
});      
export default AiChatBot;
