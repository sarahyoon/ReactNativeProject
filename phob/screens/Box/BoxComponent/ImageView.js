import React from 'react';
import {View, Text, Button, StyleSheet, Image, Dimensions, TouchableOpacity,Platform} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import {NavigationEvents} from 'react-navigation';
import { PermissionsAndroid } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import MyAlbumList from './MyAlbumList';

const { width: screenWidth } = Dimensions.get('window')



const ImageView = props => {
    const [photos, setPhotos] = React.useState([]);
    console.log("ImageView");
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
            }).catch((err) => {
                alert(err);
                
            });
        }

    };


    const carouselRef = React.useRef(null)
    const goForward = () => {
        carouselRef.current.snapToNext()
    }

    /**
     * Todo:
     * 사진이미지 크기 조절
     */
    const _renderItem = ({item, index}, parallaxProps) => {
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

    const[imageUri, setImageUri] = React.useState('');

    const setActivePage = () => {
        let imageIndex = carouselRef.current.currentIndex;
        if(imageIndex == 0){
            /**
             * Todo:
             * 화면 진입후, 첫번째 사진정보 myAlbumList로 넘기기
             */
            console.log(carouselRef.current.props.data[imageIndex].node.image.uri);
            setImageUri(carouselRef.current.props.data[imageIndex].node.image.uri);
            }
        setImageUri(carouselRef.current.props.data[imageIndex].node.image.uri);
        console.log(carouselRef.current.props.data[imageIndex].node.image.uri);

    }

    return(
        <>
        

        <NavigationEvents onDidFocus={loadImages} />
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
                    onSnapToItem = {setActivePage}
                />
            </View>
        <MyAlbumList imageUri={imageUri}/>
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