import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AddButton from './AddButton';
import SelectGroup from '../SelectGroup/SelectGroup';

const Header = props => {
    return(
        <>
        <View style={{height:200, backgroundColor:'#4287f5'}}>
        <AddButton {...props} />
        <SelectGroup />
        </View>
        </>
    );
}
//1. select singer modal


export default Header;