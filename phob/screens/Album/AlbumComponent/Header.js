import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AddButton from './AddButton';

const Header = () => {
    return(
        <>
        <View style={{height:240, backgroundColor:'#4287f5'}}>
        <AddButton/>
        </View>
        </>
    );
}
//1. select singer modal


export default Header;