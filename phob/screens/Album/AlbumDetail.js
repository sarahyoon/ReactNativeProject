import React from 'react'
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';



function Item({image}){
    return(
        <View style={{flexDirection:'row'}}>
        <View style={styles.albumContainer}>
        <Image source = {{uri:image}} style={{width:180, height:180}}></Image>
        </View>
        </View>
    );
}

const AlbumDetail = props => {
    // const {navigation} = props.navigation;
    // alert(JSON.stringify(navigation.state.params.title));
    const[pics, setPics] = React.useState({});
    const load = async() => {
      const id = props.navigation.state.params.id;
      let list = await AsyncStorage.getItem('Album');
      list = list ? JSON.parse(list) : [];
      const pics = _.find(list, element => element.id === id);
      console.log(id);
      setPics(pics);

    }

    return(
      <>
      <NavigationEvents onWillFocus={load}/>
        {/* <FlatList
        data={pics}
        renderItem={({item}) => 
        <Item image={item.image}/>
    }
        style={styles.list}
    /> */}
    </>
    );

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
