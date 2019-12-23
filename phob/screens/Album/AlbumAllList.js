import React from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


    function Item({title, image}){
        return(
            <View style={{flexDirection:'row' ,
            alignItems:'center', justifyContent:'center'}}>
            <View style={styles.albumContainer}>
            <Image source = {{uri:image}} style={{width:180, height:180}}></Image>
            <Text style={{fontSize:20, color:'black', justifyContent:'center', alignItems:'center'}}>
            {title}</Text>
            </View>
            </View>
        );
    }
    
    
    const AlbumAllList = props=>{
         const {navigate} = props.navigation;
         const [albumList, setAlbumList] = React.useState([]);

        // albumDetail = () =>{
        //     return navigate('AlbumDetail');
        // }
        const albumDetail = Item => {
            return navigate('AlbumDetail')
        }

        const loadData = async() => {
            let list = await AsyncStorage.getItem('album');
            list = list ? JSON.parse(list) : [];
            setAlbumList(list);
        }

        React.useEffect(() => {
            loadData();
    
        }, [albumList]);
    
        return(
            <FlatList
            numColumns={2}
            data={albumList}
            renderItem={({item}) => 
            <TouchableOpacity onPress = {albumDetail}>
            <Item image={item.albumImage} title={item.name}/>
            </TouchableOpacity>
        }
            style={styles.list}
        />
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
            justifyContent:'center',
            alignItems:'center'
            
        },
        list:{
            flexDirection:'row'
        }
      });
    
    export default AlbumAllList;