import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';


let ListItem = props => (
  
    <TouchableOpacity onPress={props.onPress}>
        <View style={{paddingTop:10, paddingRight:8}}>
            <Image source = {props.item.source} style={{width:60, height:60,borderRadius: 10}}/>
            <Text style={{fontSize:30}}>{props.item.name}</Text>
        </View>
    </TouchableOpacity>
)

const MyAlbumList = props => {

    const [albumList, setAlbumList] = React.useState([]);
    const loadData = async() => {
        let list = await AsyncStorage.getItem('album');
        list = list ? JSON.parse(list) : [];
        setAlbumList(list);
        //console.log(list);
    }
    return(
        <>
        <NavigationEvents onDidFocus={loadData}/> 

        <View>
        <FlatList data = {albumList}
             horizontal = {true}
             renderItem = {itemProps => 
            <ListItem {...itemProps}
                //    onPress = {
                //      () => props.navigation.navigate('AlbumDetail', {id: itemProps.item.id, name:itemProps.item.name})
                //    }
             />}
            keyExtractor = {item => item.id}/>
        </View>
        </>
    );
}

export default MyAlbumList;