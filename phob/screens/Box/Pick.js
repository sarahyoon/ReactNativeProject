import React from 'react';
import {View, Text, Button} from 'react-native';

const Pick = props => {
    return(

        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
            <Button title="pick" onPress={() => props.navigation.navigate('MyBox') }/>
        </View>

    );
};

export default Pick;