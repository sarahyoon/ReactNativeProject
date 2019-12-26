import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Select2 from 'react-native-select-two';
//import Style from 'styled-components/native';


const YourOwnComponent = () => {
<Text>Your Pretty Component Goes Here</Text>


}


const groups = [
  { id: 1, name: "BTS", checked: true }, // set default checked for render option item
  { id: 2, name: "청하" },
  { id: 3, name: "EXO" }
]

const selectBox = () => {
    
  return(
    <Select2
    isSelectSingle={true}
    style ={{borderRadius:5}}
    colorTheme = "blue"
    popupTitle="select group"
    title = "select group"
    data ={groups}
    onSelect={data => {
      data(data.name)
    }}
    onRemoveItem={data => {
      data(data.name)
    }}
    cancelButtonText = "cancel"
    selectButtonText="select"
  />
  )

}

const SelectGroup = props => {

  //const[isChecked, setIsChecked] = React.useState(false);
  const [select, setSelect] = React.useState('');

    return(
        // <View >
        //     <Text>{select}</Text>
        //     <TouchableOpacity  onPress={selectBox}>
        //     <Image source={require('../../../Assets/Icons/arrow_down.png')} style={{width:20, height:20}}/>
        //     </TouchableOpacity>
            
        // </View>
        <View style={{marginTop:10}}>
          <Select2
          style={{width: 80, height: 80, fontSize:100, borderColor: 'transparent', paddingHorizontal: 1, paddingVertical:1}}
          isSelectSingle={true}
          popupTitle="select group"
          title = "select group"
          colorTheme = "blue"
          data ={groups}
          onSelect={data => {
            setSelect(data.name)
          }}
          onRemoveItem={data => {
            setSelect(data.name)
          }}
          cancelButtonText = "cancel"
          selectButtonText="select"
          searchPlaceHolderText = "select group"
          />
        </View>

         /* { <RBSheet
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
        </RBSheet>  }*/
        
        
    );
};

export default SelectGroup;