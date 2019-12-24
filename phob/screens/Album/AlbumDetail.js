import React from 'react';
import {View, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { NavigationEvents } from 'react-navigation';



const AlbumDetail = props => {

    let headerTitle = props.navigation.state.params.name;
    console.log(headerTitle);
    setAlbumHeader(headerTitle);
    // navigationOptions = {
    //     title:headerTitle
    // };

    //setAlbumHeader(headerTitle);
    return(
        
        <>
        </>
    );
};

const setAlbumHeader=(headerTitle) => {
    console.log("set header");
    AlbumDetail.navigationOptions = {
        title: headerTitle
    };
}

// AlbumDetail.navigationOptions = {
//     title: 'header'
// };


export default AlbumDetail;
