import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import AddButton from './AddButton';
import SelectGroup from '../SelectGroup/SelectGroup';

const Header = props => {
    return(
        <>
        <View style={styles.container}>
            <View>
                <AddButton {...props} />
            </View>
           
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <SelectGroup />
            <TouchableOpacity style={{marginRight:20, }}>
                {
                    /**
                     * onPress하면, context에 album delete 상태 true로 변경
                     * -> albumViewList에서 앨범별 삭제가능
                     */
                }
                    <Text style={styles.all}>편집</Text>
            </TouchableOpacity>
            </View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    all:{
        fontSize:18,
        color:'white',
      },
    container:{
        height:170,
        backgroundColor:'royalblue'
    }

});

export default Header;