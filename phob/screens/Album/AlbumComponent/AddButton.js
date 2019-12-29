import React from 'react';
import {View, Text, TouchableOpacity, Image, Button, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Styled from 'styled-components';


const PlusButton = Styled.TouchableOpacity`
    justify-content:center;
    marginTop: 58;
    marginLeft: 20;
    height:50;
    width:50;

`;

const ModalView = Styled.TouchableOpacity`
    height: 160;
    backgroundColor: white;
    justifyContent: center;
    alignItems: center;
    borderRadius: 7;
    borderColor: rgba(0, 0, 0, 0.1);

`;

const AlbumText = Styled.Text`
    fontSize:15;
    fontWeight: bold;
`;

const AlbumNameInput = Styled.TextInput`
    
    margin-top: 15;
    margin-bottom:10;
    width: 200;
    height: 40;
    borderColor:#A9A9A9;
    borderWidth:1;
`;

const CreateButton = Styled.TouchableOpacity`

    width:60;
    height:35;
    border: 2px solid royalblue;
    border-radius: 3px;
    fontSize:10px;
    backgroundColor:royalblue;
`;

const ButtonText = Styled.Text`
    marginTop:5
    fontSize:18;
    color:white;
    text-align:center;
`;


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
        
        if(name === ''){
            alert('앨범이름을 입력하세요!');
            return;
        }
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
            <PlusButton onPress = {toggleModal}>
                <Image 
                source = {
                    require('../../../Assets/Icons/add.png')
                }
                style={{width:30, height:30}}
                />
            </PlusButton>
            <Modal isVisible={isModalVisible}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    onBackdropPress={() => setModalVisible(!isModalVisible)}        
            >
                <ModalView>
                    <AlbumText>앨범 이름을 입력하세요.</AlbumText>
                    <AlbumNameInput
                    onChangeText={text => setName(text)}
                    value={name} />
                    {/* <Button style={styles.cancel} title="cancel" onPress={toggleModal} /> */}
                    <CreateButton onPress={pressOk}>
                        <ButtonText>확인</ButtonText>
                    </CreateButton>
                </ModalView>
            </Modal>
        </View>
    );
};



export default AddButton;