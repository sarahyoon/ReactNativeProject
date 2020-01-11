import React from 'react';
import {FlatList, View, Text, ScrollView, TouchableOpacity, Image, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';


let ListItem = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={{paddingTop:10, paddingRight:8, justifyContent:'center', alignItems:'center'}}>
            <Image source = {props.item.images[0].source} style={{width:332, height:217,borderRadius: 10}}/>
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
        /**
         * Todo: 
         * 앨범에 사진 없는 경우: default 사진
         * 앨범에 사진 존재하는 경우: 저장된 첫번째 사진 불러오기
         */
        //console.log(list);
    }

    const deleteAll = () => {
        let list = [...albumList];
        list.splice(0, list.length);
        setAlbumList(list);
        AsyncStorage.setItem('album', JSON.stringify(list));
    }

    /**
     * Todo:
     * AddButton 컴포넌트에서 modal close하면 
     * 추가된 앨범 바로 albumview에 랜더링 
     */
    //console.log("props" + props);
    React.useEffect(() => {
     loadData();
     //console.log("load");
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
             renderItem = {
             itemProps => 
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