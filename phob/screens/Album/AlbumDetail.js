import React from 'react';
import {View, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import ImageView from 'react-native-image-view';

const data = [
    {
        id:'0',
        image:'https://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
    },
    {
        id:'1',
        image:'https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/01/shutterstock_587562362.jpg',
    },
    {
        id:'2',
        image:'https://www.vets4pets.com/siteassets/species/dog/puppy/puppy-running-playing.jpg?width=1040',
    },
    // {
    //     image:'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/field_blog_entry_teaser_image/puppy_0.jpg?itok=z4JZm548',
    // },
    // {
    //     image:'https://i2.wp.com/metro.co.uk/wp-content/uploads/2018/03/739281687.jpg?quality=90&strip=all&zoom=1&resize=644%2C429&ssl=1',
    // }
]

let Item = props => (
        <TouchableOpacity onPress={props.onPress}>
        <View style={{flexDirection:'row'}}>
        <View style={styles.albumContainer}>
        <Image source = {{uri:props.item.image}} style={{width:180, height:180}}></Image>
        </View>
        </View>
        </TouchableOpacity>

);


const AlbumDetail = props => {
    const [imageVisible, setImageVisible] = React.useState(false);
    console.log(imageVisible);
    const[index, setIndex] = React.useState(0);
    let headerTitle = props.navigation.state.params.name;
    //console.log(headerTitle);
    setAlbumHeader(headerTitle);

    //setAlbumHeader(headerTitle);
    return(
        
        <>
        <View>
        <FlatList
        numColumns={2}
        data={data}
        renderItem={ itemProps =>
        <Item {...itemProps}
            onPress = {
                () => {setImageVisible(!imageVisible), setIndex(itemProps.index)}
            }
        />}
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
    //console.log("set header");
    AlbumDetail.navigationOptions = {
        title: headerTitle
    };
}

const styles=StyleSheet.create({

    list:{
        flexDirection:'row'
    }
  });

export default AlbumDetail;
