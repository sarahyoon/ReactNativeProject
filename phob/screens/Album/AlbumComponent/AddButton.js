import React from 'react';
import {View, Text, TouchableOpacity, Image, Button, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';


const AddButton = () => {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [name, setName] = React.useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setName('');
    }

    //save
    const pressOk = async() => {

        let list = await AsyncStorage.getItem('album');
        let number; 

        if(!list) {
            list = [];
            number = 0;
        }

        else{
            list = JSON.parse(list);
            number = list.length + 1;
        }

        const album ={
            id: 'albumID-' + number,
            imageSource: '../../../Assets/Images/newAlbum.png',
            name
        };

        list.push(album);
        await AsyncStorage.setItem('album', JSON.stringify(list));
        setModalVisible(false);
        setName('');
    }

    return(
        <View style={{flex:1}}>
            <TouchableOpacity onPress = {toggleModal}>
                <Image 
                source = {
                    require('../../../Assets/Icons/add.png')
                }
                style={{width:30, height:30}}
                />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={{backgroundColor:'#FFFF', flex:1 }}>
                
                <View style={styles.textInputStyle}>
                <Text>Create Album Name!</Text>
                <TextInput style={{ height:40, width: 100, borderColor:'gray', borderWidth:1}}
                onChangeText={text => setName(text)}
                value={name} />
                </View>

                <View style = {styles.buttonStyle}>
                <Button style={styles.cancel} title="cancel" onPress={toggleModal} />
                <Button style={styles.ok} title="ok" onPress={pressOk} />
                </View>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    textInputStyle:{
        alignItems:'center'
    },
    buttonStyle:{
        justifyContent:'center',
        flexDirection: 'row',
    },
    cancel: {

        paddingHorizontal:20,
        paddingVertical:15,
        marginRight:20,
        borderRadius:8,

    },
    ok: {
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:8,

    }
})

export default AddButton;