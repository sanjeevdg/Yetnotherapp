import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox, KeyboardAvoidingView,StatusBar
} from 'react-native';


import FaIcon from 'react-native-vector-icons/FontAwesome';

import { CohereClient } from "cohere-ai";
import {Input} from '@rneui/themed';


export default function MyCohere({ route, navigation}) {

 const dimensions = Dimensions.get('window');
    const screenWidth = dimensions.width;

const [searchTerm,setSearchTerm] = useState();

const [loading,setLoading] = useState(false);

const [result, setResult] = useState();

const [inputHeight, setInputHeight] = useState();

const cohere = new CohereClient({
  token: "2f7GPvRUHd3oxfBByZRA0oLpoXlFU5rIYYYVA1xM", // This is your trial API key
});



const queryCohere = async () => {

  const response = await cohere.generate({
    model: "command",
    prompt: searchTerm,
    maxTokens: 300,
    temperature: 0.9,
    k: 0,
    stopSequences: [],
    returnLikelihoods: "NONE"
  });

setResult(response.generations[0].text);
setLoading(false);

  console.log(`Prediction: ${response.generations[0].text}`);



}






return (


<View style={{
             flex: 1,
             width: screenWidth,
         }}>

<Text style={{backgroundColor:'orange',fontSize:25,fontFamily:'JosefinSans-SemiBold',marginBottom:10,paddingBottom:5,textAlign:'center'}} >
  Cohere AI
</Text>

<View style={{display: 'flex',flexDirection: 'column',width: '100%',marginTop:15 }} >


 <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="  Ask me anything!"
          maxLength={500}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
           onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
          style=
                        {{fontSize:18,fontFamily:'JosefinSans-Regular',borderColor:'black',alignSelf:'center',width:'96%',height:inputHeight,borderWidth:1,borderRadius:22}}
          inputStyle={{display:'flex',textAlign:'center'} }
        />  


<TouchableOpacity onPress={() => {setLoading(true); queryCohere(); } }
  style={{
        backgroundColor: '#0984e3',
        borderRadius: 22,
        flexDirection:'row',
        height: 45,
        marginLeft:1,
        marginBottom:15,
        marginTop:30,
        width:'60%',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
     }} ><FaIcon name="search" color={'white'} size={25} />
     <Text style={{fontSize:20, color:'white',fontFamily:'JosefinSans-SemiBold'}} >  Cohere Query</Text>  
</TouchableOpacity>

</View>
<ScrollView>
{loading?  (<ActivityIndicator size="large" color="#0984e3" />)
:(<><Text style={{fontSize:25,fontFamily:'JosefinSans-SemiBold',marginLeft:15}} >Answer:</Text><Text style={{marginLeft:15 ,marginRight:15,fontSize:18,lineHeight:22 ,color:'black',fontFamily:'JosefinSans-Regular'}} > {result} </Text></>)
	
 }
</ScrollView>

	</View>



	)






}

const styles = StyleSheet.create({
      container: {
    flex: 1,
    marginTop:  0,    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    width:'100%',
    marginVertical: 8,
    marginHorizontal: 1,
  },
  title: {
    fontSize: 32,
    fontFamily:'JosefinSans-Regular',
    color:'black'
  },
    list: {
        flex: 0.5,
        fontSize: 16,
        fontFamily:'JosefinSans-Regular',
        color:'black'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        color:'black'
    },
    listTitle: {
        fontSize: 22,
        fontFamily:'JosefinSans-Regular',
        color:'black'
    },
    
});