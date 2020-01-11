import React from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';

import ImageView from '../Box/BoxComponent/ImageView';
import MyAlbumList from '../Box/BoxComponent/MyAlbumList';

const MyBox = props => {
    console.log("myBox"+props.name);
    let headerTitle = props.name;
    // setAlbumHeader(headerTitle);
    /**
     * Todo:
     * 전체 모달뷰로 변경
     */

    return(
        <>  
            <View style={{flex:1,backgroundColor:'black'}}>
            <Text style={{color:'white', fontSize:20, justifyContent:'center', }}>{headerTitle}</Text>
            <ImageView
                
            {...props}/>
            </View>

        </>
    );
}
// const setAlbumHeader=(headerTitle) => {

//     MyBox.navigationOptions = {
//         title: headerTitle
//     };
// }

export default MyBox;