import React from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

const LoadImages = props => {
    CameraRoll.getPhotos({
        first:20,
        assetType:'Photos',
    }).then(r=>{
        props.setPhotos({photos: r.edges})
    }).catch((err) => {

    });
};

const MyBox = () => {
    const [photos, setPhotos] = React.useState([]);
    
    const loadImages = () => {
        
    }
    return(
        <View style={{flex:1}}>
            <Text style={{fontSize: 30}}> My Box</Text>
            <Button title="load images" onPress={LoadImages}></Button>
            <ScrollView>
                {
                    photos.map((p, i) => {
                        return(
                            <Image
                                key={i}
                                style={{
                                    width:300,
                                    height:100,
                                }}
                                source={{uri:p.node.image.uri}}
                            />
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

export default MyBox;