import React from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';


    let Item = props => (
          <TouchableOpacity onPress={props.onPress}>
            <View style={{flexDirection:'row' ,
            alignItems:'center', justifyContent:'center'}}>
            <View style={styles.albumContainer}>
            <Image source = {props.image} style={{width:180, height:180}}></Image>
            <Text style={{fontSize:20, color:'black', justifyContent:'center', alignItems:'center'}}>
            {props.title}</Text>
            </View>
            </View>
          </TouchableOpacity>
        );
 
    
    const AlbumAllList = props=>{
         const [albumList, setAlbumList] = React.useState([]);

        const loadData = async() => {
            let list = await AsyncStorage.getItem('album');
            list = list ? JSON.parse(list) : [];
            setAlbumList(list);
        }

        React.useEffect(() => {
    
        }, []);
    
        return(   
          <>
          <NavigationEvents onDidFocus={loadData}/> 
            <FlatList
            numColumns={2}
            data={albumList}
            renderItem={({item}) => 
            <Item image={item.source} title={item.name}
            onPress = {() => props.navigation.navigate('AlbumDetail', {id: item.id, name:item.name})}
            />}
            style={styles.list}
            keyExtractor = {item => item.id}
        />
        </>
        );
    };

    AlbumAllList.navigationOptions = {
      title:'전체보기',
      
    };
    
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