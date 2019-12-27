import React from 'react';
import {View, Text, TouchableOpacity, Image, Button, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';


const AddButton = props => {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [name, setName] = React.useState('');
   // const [imageSource, setImageSource] = React.useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setName('');
    }

    //save
    const pressOk = async() => {
        
        //setImageSource('../../../Assets/Images/defaultImage.png');
        //const defaultImage = '../../../Assets/Images/defaultImage.png';
        let list = await AsyncStorage.getItem('album');
        let number; 

        if(!list) {
            list = [];
            number = 1;
        }

        else{
            list = JSON.parse(list);
            number = list.length + 1;
        }

        const album ={
            id: 'albumID-' + number,
            images:[
                {   
                    imageId:'0',
                    source:{
                        uri:"https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg"
                    },
                    width:806,
                    height:720,
                },
            ],
            name
        };

        list.push(album);
        await AsyncStorage.setItem('album', JSON.stringify(list));
        setModalVisible(false);
        setName('');
    }

    return(
        <View style={{flex:1}}>
            <TouchableOpacity onPress = {toggleModal} style={styles.addButton}>
                <Image 
                source = {
                    require('../../../Assets/Icons/add.png')
                }
                style={{width:30, height:30}}
                />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                
                <View style={styles.textInputStyle}>
                <Text>Create Album Name!</Text>
                <TextInput style={{ height:50, width: 150, borderColor:'gray', borderWidth:1}}
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
    addButton:{
        flex:1,
        justifyContent:'center',
        height:30,
        width:30
    },

    modal:{
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

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