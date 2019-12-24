import React from 'react'
import {View, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';



// let Item = props => (
//   <TouchableOpacity onPress={props.onPress}>
//       <View style={{flexDirection:'row'}}>
//       <View style={styles.albumContainer}>
//           <Image source = {{uri:props.item.imageSource}} style={{width:180, height:180}}/>
//       </View>
//       </View>
//   </TouchableOpacity>
// )


const AlbumDetail = props => {
  
    // const {navigation} = props.navigation;
    // alert(JSON.stringify(navigation.state.params.title));
    //const[pics, setPics] = React.useState([]);


    const load = async() => {
      let headerTitle = props.navigation.state.params.name;
      console.log(headerTitle);
      // setAlbumHeader(headerTitle);

      // const id = props.navigation.state.params.id;
      // let list = await AsyncStorage.getItem('Album');
      // list = list ? JSON.parse(list) : [];
      // const pics = _.find(list, element => element.id === id);
      // console.log(id);
      // setPics(pics);

    }
    // React.useEffect(() => {
    //   load;
    // },[]);

    return(
      <>
       <NavigationEvents onDidFocus={load}/>
        {/* <FlatList
        data={pics}
        renderItem= {itemProps => 
          <Item {...itemProps}
           />}
          keyExtractor = {item => item.id}
        style={styles.list}/> */}
    />
    </>
    );

};

let setAlbumHeader = (headerTitle) => {
  console.log(headerTitle);
  // AlbumDetail.navigationOptions = {
  //   title: headerTitle,
  // };
}



const styles=StyleSheet.create({
    all:{
      flexDirection:'row',
      alignItems:'flex-end',
      color:'blue'
    },
    sectionContainer:{
      marginTop: 30,
      paddingHorizontal: 24,
    },
    titles:{
      justifyContent:'space-between',
      flexDirection:'row'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'black',
    },
    highlight: {
      fontWeight: '700',
    },
    albumContainer:{
        paddingTop:10,
        paddingRight:8,
        
        
    },
    list:{
        flexDirection:'row'
    }
  });

export default AlbumDetail;
