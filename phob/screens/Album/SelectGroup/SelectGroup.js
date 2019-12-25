import React from 'react';
import {View, Text, Button} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";


const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;



const SelectGroup = () => {


    return(
        <View>
            <Text>BTS</Text>
            <Button title='pick' onPress={() => {
            this.RBSheet.open();
          }}/>

            <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <YourOwnComponent />
        </RBSheet>
        </View>
        
    );
};

export default SelectGroup;