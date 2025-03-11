import React, { useState,useEffect } from 'react';

import {StyleSheet,TextInput,SafeAreaView,TouchableOpacity,FlatList, ScrollView,Text,View} from 'react-native';

import {Input,Image} from '@rneui/themed';

import FaIcon from 'react-native-vector-icons/FontAwesome';




/*
items
items.id.videoId
items.snippet.title
items.snippet.description
items.snippet.thumbnails.medium.url
items.snippet.thumbnails.medium.width
items.snippet.thumbnails.medium.height
*/



const MoviesSearch = ({ navigation,route }) => { 
  
const [searchTerm, setSearchTerm]   = useState();

const [movieItems,setMovieItems ] = useState();



const get_movie_details = async (imdbid) => {





console.log('one',imdbid)
//www.themealdb.com/api/json/v1/1/search.php?s=
//https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=
const url = `https://www.omdbapi.com/?i=`+imdbid+`&apikey=ddb3e43` ;
       
        try { 
            const response = await fetch(url);
            const result = await response.json();
         //   const responseObject = JSON.parse(result);
            console.log('moviee-details==>',result);
         //   setMovieItems(result.Search);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }

}


const searchMovies = async () => {





console.log('one')
//www.themealdb.com/api/json/v1/1/search.php?s=
//https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=
const url = `https://www.omdbapi.com/?s=`+encodeURIComponent(searchTerm)+`&apikey=ddb3e43` ;
       
        try { 
            const response = await fetch(url);
            const result = await response.json();
         //   const responseObject = JSON.parse(result);
            console.log('responseObject==>',result.Search);
            setMovieItems(result.Search);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }

}
/*
items
items.id.videoId
items.snippet.title
items.snippet.description
items.snippet.thumbnails.medium.url
items.snippet.thumbnails.medium.width
items.snippet.thumbnails.medium.height

openweathermap.org api key
4a2ed27c3944fcdff7d4b2b93e0e44f0

*/
function renderItem(item) {
    
//console.log('MYITEM-->',item);
//navigation.navigate('PlayYoutubeVideo',{myitem:item} )
    return (

<View style={{display:'flex' ,alignItems:'center',justifyContent:'center',marginBottom:15,width:'100%',alignSelf:'center'}} >
  <Text style={{fontSize:20,lineHeight:25,color:'black',fontFamily:'JosefinSans-Regular'}} >{item.Title} </Text>
<Image source={{
       uri: item.Poster,
       cache: 'only-if-cached',
      }}
      onPress={()=> navigation.navigate('MovieDetail',{'imdbid':item.imdbID}) }
      style={{ width: 300 ,height:450 }}
           />
 </View>

    );
  };


  
  return (

 <SafeAreaView style={styles.container}>


<View style={{display: 'flex',flexDirection: 'column',width: '100%',marginTop:15 }} >

 <Input
          editable
          multiline
          numberOfLines={2}
          placeholder="Enter movie name like Titanic..."
          maxLength={250}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          inputContainerStyle=
                        {{alignSelf:'center',borderColor:'black',width:'95%',height:45,borderWidth:1,borderRadius:22}}
          inputStyle={{display:'flex',fontSize:18,fontFamily:'JosefinSans-Regular'} }
        />  


<TouchableOpacity onPress={searchMovies}
  style={{
        backgroundColor: '#0984e3',
        borderRadius: 22,
        flexDirection:'row',
        height: 45,
        marginLeft:2,
        marginTop:1,
        width:'60%',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
     }} ><FaIcon name="search" color={'white'} size={25} />
     <Text style={{fontSize:20, color:'white',fontFamily:'JosefinSans-SemiBold'}} >  Search Imdb</Text>  
</TouchableOpacity>
</View>


        <FlatList
          data={movieItems}
          renderItem={ ({item})  => renderItem(item)}
          keyExtractor={item => item.imdbID.toString()}
          extraData={item => item.imdbID.toString()}
        />






      </SafeAreaView>

    



);
      }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});      
export default MoviesSearch;
