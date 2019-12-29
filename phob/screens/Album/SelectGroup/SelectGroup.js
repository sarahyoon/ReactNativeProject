import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Animated, FlatList, Button} from 'react-native';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';

const NameText = Styled.Text`
  fontSize:20;
  marginRight:8;
  color:white
`;

const GroupSelect = Styled.TouchableOpacity`
  marginTop:30;
  flexDirection:row;
  marginLeft:20;
  height:40;
  width:150;
  alignItems:center;
`;


const SelectList = () => 
<ScrollView>
  <View>

  </View>
</ScrollView>


const groups = [
  {label: 'param1', value: 0 },
  {label: 'param2', value: 1 }
]


const SelectGroup = props => {

  const [arrowImage, setArrowImage] = React.useState(true);
  const [isBottomModal, setBottomModal] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  let cancelButtonText = 'cancel';
  let colorTheme = '#16a45f';
  let buttonStyle = {};
  let selectButtonText = 'select';
  let buttonTextStyle = {};

  onItemSelected = (item, isSelectSingle) => {
    let selectedItem = [];
    let { data } = this.state;
    item.checked = !item.checked;
    for (let index in data) {
        if (data[index].id === item.id) {
            data[index] = item;
        } else if (isSelectSingle) {
            data[index].checked = false;
        }
    }
    data.map(item => {
        if (item.checked) selectedItem.push(item);
    })
    this.setState({ data, selectedItem });
}

  let renderItem = ({ item, idx }) => {
    return (
        <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            style={styles.itemWrapper}
            onPress={() => onItemSelected(item, isSelectSingle)}>
            <Text>
              hi
            </Text>
            <Icon style={styles.itemIcon}
                name={checked ? 'check-circle-outline' : 'radiobox-blank'}
                color={checked ? '#16a45f' : '#777777'} size={20} />
        </TouchableOpacity>
    );
  }
  
  renderEmpty = () => {
    let { listEmptyTitle } = this.props;
    return (
        <Text style={[styles.empty, this.defaultFont]}>
            {listEmptyTitle}
        </Text>
    );
  }
  
    return(
        <>      
        <View style={{flex:1}}>
          <GroupSelect onPress={() => {
          setBottomModal(!isBottomModal);
          setArrowImage(false);
          }}>
              <NameText>PengSoo</NameText>
              <Image source={ arrowImage === true ? 
              require('../../../Assets/Icons/arrow_down.png') : require('../../../Assets/Icons/arrow_up.png') } 
              style={{width:15, height:15}}/>
          </GroupSelect>

          <Modal isVisible={isBottomModal}
                    style={styles.view}
                 swipeDirection='down'
                 onSwipeComplete={() => {setBottomModal(false), setArrowImage(true)}}
                 onBackdropPress={() => {setBottomModal(!isBottomModal), setArrowImage(true)}}        
          >
                <View style={styles.modal}>
                  <FlatList
                    style={styles.listOption}
                    data={groups}
                    keyExtractor={ (item, idx) => idx.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                  />
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => {
                                    this.cancelSelection();
                                }}
                                title={cancelButtonText}
                                textColor={colorTheme}
                                backgroundColor='#fff'
                                style={[styles.button, buttonStyle, 
                                { marginRight: 5, marginLeft: 10, borderWidth: 1, borderColor: colorTheme }]} />
                            <Button
                                onPress={() => {
                                    let selectedIds = [], selectedObjectItems = [];
                                    selectedItem.map(item => {
                                        selectedIds.push(item.id);
                                        selectedObjectItems.push(item);
                                    })
                                    onSelect && onSelect(selectedIds, selectedObjectItems);
                                    this.setState({ show: false, keyword: '', preSelectedItem: selectedItem });
                                }}
                                title={selectButtonText}
                                backgroundColor={colorTheme}
                                textStyle={buttonTextStyle}
                                style={[styles.button, buttonStyle, { marginLeft: 5, marginRight: 10 }]} />
                        </View>

                </View>

            </Modal>
        </View> 
        </>
        
    );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal:{
    backgroundColor: 'white',
    padding: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
},
listOption: {
  paddingHorizontal: 24,
  paddingTop: 1, marginTop: 16
},
itemIcon: {
  width: 30, textAlign: 'right'
},
buttonWrapper: {
  marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
},
button: {
  height: 36, flex: 1
},
});

export default SelectGroup;