import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AddButton from './AddButton';
import SelectGroup from '../SelectGroup/SelectGroup';

const Header = props => {
    return(
        <>
        <View style={styles.container}>
            <AddButton {...props} />
            <SelectGroup />
        </View>
        </>
    );
}

const styles = StyleSheet.create({

    container:{
        height:170,
        backgroundColor:'royalblue'
    }

});

export default Header;