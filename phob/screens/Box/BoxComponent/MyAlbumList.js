import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';


let ListItem = props => (

    /*
    Todo:
    앨범리스트 레이아웃 수정 필요!
    */
    <TouchableOpacity onPress={props.onPress}>
        <View style={{paddingTop:10, paddingRight:8}}>
            <Image source = {props.item.images[0].source} style={{width:60, height:60,borderRadius: 10}}/>
            <Text style={{fontSize:15}}>{props.item.name}</Text>
        </View>
    </TouchableOpacity>
)


const MyAlbumList = props => {
    console.log("myalbumlist");
    const [albumList, setAlbumList] = React.useState([]);
    const loadData = async() => {
        let list = await AsyncStorage.getItem('album');
        list = list ? JSON.parse(list) : [];
        setAlbumList(list);
        console.log(list);
    }

    const selectAlbum = (itemProps) => {
        const imageUri = props.imageUri;
        console.log(imageUri);
        /**
         * Todo:
         * imageUri를 itemProps의 앨범에 insert,
         * insert한 사진은 보이지 않기
         * 앨범에 사진들어가는 애니메이션 적용
         */

        //console.log(itemProps.index);
        // const newImage = {
        //     imageId:'2',
        //     source:{
        //         uri:imageUri
        //     },
        //     width:806,
        //     height:720,
        // };
        // albumList[itemProps.index].images.push(newImage);
        // AsyncStorage.setItem()
        // AsyncStorage.mergeItem('albumID-1', JSON.stringify(albumList));
        // console.log(itemProps);
    }

    return(
        <>
        <NavigationEvents onDidFocus={loadData}/> 

        <View>
        <FlatList data = {albumList}
             horizontal = {true}
             renderItem = {
                 itemProps => 
            <ListItem {...itemProps}
                onPress = {() => selectAlbum(itemProps)}
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