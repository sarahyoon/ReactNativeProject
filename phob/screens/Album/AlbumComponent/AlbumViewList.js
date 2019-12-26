import React from 'react';
import {FlatList, View, Text, ScrollView, TouchableOpacity, Image, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';


let ListItem = props => (
  
    <TouchableOpacity onPress={props.onPress}>
        <View style={{paddingTop:10, paddingRight:8}}>
            <Image source = {props.item.source} style={{width:332, height:217,borderRadius: 10}}/>
            <Text style={{fontSize:20}}>{props.item.name}</Text>
        </View>
    </TouchableOpacity>
)

const AlbumViewList = props => {
    
    const [albumList, setAlbumList] = React.useState([]);
    const loadData = async() => {
        let list = await AsyncStorage.getItem('album');
        list = list ? JSON.parse(list) : [];
        setAlbumList(list);
        //console.log(list);
    }

    const deleteAll = () => {
        let list = [...albumList];
        list.splice(0, list.length);
        setAlbumList(list);
        AsyncStorage.setItem('album', JSON.stringify(list));
    }

    React.useEffect(() => {
      //loadData();
    }, []);

    return(
    <>
        <NavigationEvents onDidFocus={loadData}/> 
         <View style={styles.sectionContainer}>
            <View style={styles.titles}> 
                <Text style={styles.sectionTitle}>나의 앨범</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('AlbumAllList') }>
                    <Text style={styles.all}>전체보기</Text>
                    <Button title='delete' onPress={deleteAll}></Button>
                 </TouchableOpacity>
            </View>
            <FlatList data = {albumList}
             renderItem = {itemProps => 
            <ListItem {...itemProps}
                   onPress = {
                     () => props.navigation.navigate('AlbumDetail', {id: itemProps.item.id, name:itemProps.item.name})
                   }
             />}
            keyExtractor = {item => item.id}/>
         </View>

    </>
    );
    
};


const styles=StyleSheet.create({
    all:{
      flexDirection:'row',
      alignItems:'flex-end',
      color:'blue'
    },
    sectionContainer:{
      flex:1,
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
    }
  });

export default AlbumViewList;