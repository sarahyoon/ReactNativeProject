import React from 'react';
import {FlatList, View, Text, ScrollView, TouchableOpacity, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import {NavigationEvents} from 'react-navigation';

let ListItem = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={{marginTop:300}}>
            <Image source = {props.item.imageSource} style={{width:100, height:100}}/>
            <Text style={{fontSize:20}}>{props.item.name}</Text>
        </View>
    </TouchableOpacity>
)


const AlbumViewList =() => {

    const [albumList, setAlbumList] = React.useState([]);

    const loadData = async() => {
        let list = await AsyncStorage.getItem('album');
        list = list ? JSON.parse(list) : [];
        setAlbumList(list);
    }

    const deleteAll = () => {
        albumList.splice(0, albumList.length);
        setAlbumList(albumList);
    }

    React.useEffect(() => {
        loadData();

    }, [albumList]);

    return(
    <>

         {/* <NavigationEvents onDidFocus={ loadData }/> */}
        <Button title = "delete" onPress={deleteAll}/>
        <FlatList data = {albumList}
        renderItem = {itemProps => 
        <ListItem {...itemProps}        
        />
        }
        keyExtractor = {
            item => item.id
        }/>
    </>
    );
    
};

export default AlbumViewList;