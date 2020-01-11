import React from 'react';
import {View, Text, Button, FlatList, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Styled from 'styled-components/native';
import Modal from "react-native-modal";
import MyBox from "./MyBox";
const LogoView = Styled.View`
    flex:1;
    justify-content:center;
    alignItems: center;
    marginTop:100;

`;

const logo = [
    {
        id:'logo-blackPink',
        name:'블랙핑크',
        path: require('../../Assets/Images/bplogo.png'),
        width:30,
        height:30,
    },

    {
        id:'logo-bts',
        path: require('../../Assets/Images/btslogo.png'),
        name: 'BTS',
        width:30,
        height:30,
    }
]

const Logo = props => (
    
    <TouchableOpacity onPress = {props.onPress} >
        <Image source = {props.item.path }/>
    </TouchableOpacity>
)


const Pick = props => {

    const [isVisible, setIsVisible] = React.useState(false);
    const [groupName, setGroupName] = React.useState('');


    return(

        <>
        <LogoView>
            <FlatList
                numColumns={2}
                data = {logo}
                renderItem = { 
                    itemProps => (
                        <Logo {...itemProps}
                        // onPress = {() => props.navigation.navigate('MyBox', {name:itemProps.item.name})
                        onPress = {
                            () => {
                                setIsVisible(!isVisible);
                                setGroupName(itemProps.item.name);
                            }
                        }
                        />
                    )}
                keyExtractor = {(item) =>item.id}
            />
        </LogoView>
        <Modal isVisible={isVisible}
                style={{margin:0, }}>
            <Button title ="close" style={{color:'blue', flex:1, justifyContent:'center', alignItems:'center'}} />
            <MyBox name={groupName}/>
        </Modal>
        </>
    );
};

export default Pick;