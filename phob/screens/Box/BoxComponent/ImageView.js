import React from 'react';
import {View, Text, Button, StyleSheet, Image, Dimensions, TouchableOpacity,Platform} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import {NavigationEvents} from 'react-navigation';
import { PermissionsAndroid } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')



const ImageView = props => {
    const [photos, setPhotos] = React.useState([]);

    async function requestExternalStoreageRead() {
        try {
            const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                      {
                           'title': 'Cool App ...',
                           'message': 'App needs access to external storage'
                       }
            );
    
            return granted == PermissionsAndroid.RESULTS.GRANTED
    } 
    catch (err) {
      //Handle this error
      return false;
    };
}
   const loadImages = async() => {
        
        if(Platform.os === 'android'){
            if (await requestExternalStoreageRead()) {
                CameraRoll.getPhotos({
                first:20,
                assetType:'All',
            }).then(r=>{
                setPhotos(r.edges);
                console.log(photos)
            }).catch((err) => {
                alert(err);
                
            });
            }
        }
        else{
            CameraRoll.getPhotos({
                first:20,
                assetType:'All',
            }).then(r=>{
                setPhotos(r.edges);
                console.log(photos)
            }).catch((err) => {
                alert(err);
                
            });
        }

    };


    const carouselRef = React.useRef(null)

    const goForward = () => {
        carouselRef.current.snapToNext()
    }

    const _renderItem = ({item, index}, parallaxProps) => {
        console.log(photos);
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{uri:item.node.image.uri}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text> */}
            </View>
        );
    }
    
    return(
        <>
        <NavigationEvents onDidFocus={loadImages} />
        <View style={{flex:1}}>

            <View style={styles.container}>
                <TouchableOpacity onPress={goForward}>
                    <Text>go to next slide</Text>
                </TouchableOpacity>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={photos}
                    renderItem={_renderItem}
                    hasParallaxImages={true}
                />
            </View>
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'black'
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
  });

export default ImageView;