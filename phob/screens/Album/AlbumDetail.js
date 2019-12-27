import React from 'react';
import {View, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import ImageView from 'react-native-image-view';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
    {
        id:'0',
        source : {
            uri:'https://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
        },
        width: 806,
        height: 720,
    },
    {
        id:'1',
        source : {
            uri:'https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/01/shutterstock_587562362.jpg',
        },
        width: 806,
        height: 720,
    },
    {
        id:'2',
        source : {
            uri:'https://www.vets4pets.com/siteassets/species/dog/puppy/puppy-running-playing.jpg?width=1040',
        },
        width: 806,
        height: 720,
    },
    // {
    //     image:'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_teaser_image/puppy_0.jpg?itok=z4JZm548',
    // },
    // {
    //     image:'https://i2.wp.com/metro.co.uk/wp-content/uploads/2018/03/739281687.jpg?quality=90&strip=all&zoom=1&resize=644%2C429&ssl=1',
    // }
]

const images = [
    {
        source: {
            uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
        },
        title: 'Paris',
        width: 806,
        height: 720,
    },
]

let Item = props => (
        <TouchableOpacity onPress={props.onPress}>
        <View style={{flexDirection:'row'}}>
        <View style={styles.albumContainer}>
        <Image source = {props.source} style={{width:180, height:180}}></Image>
        </View>
        </View>
        </TouchableOpacity>

);


const AlbumDetail = props => {

    let headerTitle = props.navigation.state.params.name;
    setAlbumHeader(headerTitle);

    const [imageVisible, setImageVisible] = React.useState(false);
    const[index, setIndex] = React.useState(0);



    return(
        
        <>
        <View style={styles.container}>
        <FlatList 
            numColumns = {2}
            data = {data}
            renderItem = {
                ({item, index}) => (
                    <Item {...item}
                    onPress = {
                        () => {setImageVisible(true), setIndex(index)}
                    }
                    />
                )}
            keyExtractor = {(item) => item.id}
            style={styles.list}
        />
        <ImageView
            images = {data}
            imageIndex={index}
            isVisible={imageVisible}
            onClose = {
                () => setImageVisible(!imageVisible) 
            }
            onImageChange={index => {
                console.log(index);
            }}
            
        />
        </View>
        </>
    );
};

const setAlbumHeader=(headerTitle) => {

    AlbumDetail.navigationOptions = {
        title: headerTitle
    };
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center',
    },

    list:{
        flexDirection:'row'
    }
  });

export default AlbumDetail;
