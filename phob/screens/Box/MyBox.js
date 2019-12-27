import React from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';

import ImageView from '../Box/BoxComponent/ImageView';
import MyAlbumList from '../Box/BoxComponent/MyAlbumList';

const MyBox = () => {

    return(
        <>  
            <ImageView/>
            <MyAlbumList/>
        </>
    );
}

export default MyBox;