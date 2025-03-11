import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox, KeyboardAvoidingView,StatusBar
} from 'react-native';


import FaIcon from 'react-native-vector-icons/FontAwesome';
//import SvgArrowRight from './svgComponents/SvgArrowRight';
//import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
//import MenuIcon from './svgComponents/MenuIcon';






export default function MovieDetail({ route, navigation}) {

 const dimensions = Dimensions.get('window');
    const screenWidth = dimensions.width;

const [movie,setMovie ] = useState({});


const  imdbid = route.params.imdbid;

console.log('myidmeal==',imdbid);
useEffect(() => {

const fetchMovie = async () => {

console.log('recmealdtl')
//www.themealdb.com/api/json/v1/1/search.php?s=
//https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=
const url = `https://www.omdbapi.com/?i=`+ imdbid +`&apikey=ddb3e43` ;
       
        try { 
            const response = await fetch(url);
            const result = await response.json();
         //   const responseObject = JSON.parse(result);
            console.log('responseObject==>',result);
            setMovie(result);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }

}


fetchMovie();

}, []) 


/*
 
       <View style={{zIndex:999,backgroundColor:'red'}} >
</View>






function renderItem(item) {

strInstructions

strIngredient1
strMeasure1

strMeal

strMealThumb
strYoutube

return (
   
 <View style={{display:'flex' }} >

  

)



}
*/


//renderItem={item => renderItem(item)}

const Item = ({ title}) => {

console.log('strtitle==',title)
return (
	
  <View style={styles.item}>
    	<Text style={{fontSize:20,color:'black'}}> {title} some text</Text>
  </View>
  )};

//{ renderItem(item)}


/*
Genre
Director
Writer
Actors
Awards
imdbRating


*/

return (


<View style={{
             flex: 1,
             width: screenWidth,
         }}>

<TouchableOpacity style={styles.item}>
    <Text style={styles.title}>{movie.Title}</Text>
  </TouchableOpacity>
<ScrollView contentContainerStyle={{width:'90%',alignSelf:'center',marginBottom:0} }>
<Image source={{
       uri: movie.Poster,
       cache: 'only-if-cached',
      }}
      style={{ width: 300 ,alignSelf:'center',height:450,marginBottom:10 }}
           />


<View style={{width:'100%',flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >

<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >Genre:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,color:'black',width:220,fontFamily:'JosefinSans-SemiBold'}} >  {movie.Genre}</Text>
</View>

<View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >
<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >Director:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,color:'black',marginLeft:10,width:210,fontFamily:'JosefinSans-SemiBold'}} >{movie.Director}</Text>
</View>

<View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >
<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >Writer:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,marginLeft:10,color:'black',width:210,fontFamily:'JosefinSans-SemiBold'}} >{movie.Writer}</Text>
</View>

<View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >
<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >Actors:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,marginLeft:10,width:210,color:'black',fontFamily:'JosefinSans-SemiBold',flexWrap:'wrap'}} >{movie.Actors}</Text>
</View>


<View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >
<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >Awards:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,color:'black',width:210,fontFamily:'JosefinSans-SemiBold'}} >  {movie.Awards}</Text>
</View>


<View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'flex-start',justifyContent:'flex-start'}} >
<TouchableOpacity onPress={()=> {console.log('pessed')}  }
  style={{display:'flex',marginTop:6,marginLeft:10,marginBottom:8,height:30,
alignSelf:'center',alignItems:'center',justifyContent:'center',
width:140,backgroundColor:'rgb(154 52 18)',borderRadius:15}} >
<Text style={{fontSize:18,color:'white',fontFamily:'JosefinSans-Regular'}} >imdbRating:  </Text>
</TouchableOpacity>
<Text style={{fontSize:16,color:'black',fontFamily:'JosefinSans-SemiBold'}} >  {movie.imdbRating}</Text>
</View>

	<Text style={{fontSize:24,fontFamily:'JosefinSans-SemiBold'}} >Plot</Text>


<Text style={{fontSize:16,lineHeight:22,color:'black',whiteSpace: 'pre-wrap',marginBottom:50,fontFamily:'JosefinSans-Regular'}} >


{movie.Plot}




</Text>
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
    fontSize: 26,
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