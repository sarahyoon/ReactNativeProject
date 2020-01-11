import React from 'react';
import {View, Text, Image, StyleSheet, FlatList,Dimensions, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {Radio, Button} from 'native-base';
import { SearchBar } from 'react-native-elements';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const NameText = Styled.Text`
  fontSize:20;
  marginRight:8;
  color:white
`;

const GroupSelect = Styled.TouchableOpacity`
  marginTop:10;
  flexDirection:row;
  marginLeft:20;
  height:40;
  width:150;
  alignItems:center;
`;


const groupData = [
  {
    groupName:'BTS',
    groupNo:'1111',
  },
  {
    groupName:'SF9',
    groupNo:'2222',
  },
  {
    groupName:'청하',
    groupNo:'3333',
  },
  {
    groupName:'펭수',
    groupNo:'4444',
  },
  {
    groupName:'Super Junior',
    groupNo:'5555',
  },
  {
    groupName:'EXO',
    groupNo:'6666',
  },
  {
    groupName:'Twice',
    groupNo:'7777',
  }

];


const Item = (itemProps) => (
    <>
    <TouchableOpacity onPress={itemProps.onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.groupText}>{itemProps.item.groupName}</Text>
        <Radio
          color={"#5cb85c"}
          selectedColor={"#5cb85c"}
          
          selected = {itemProps.radioValue === itemProps.item.groupNo}
          />
      </View>
    </TouchableOpacity>

    </>
);


const SelectGroup = props => {

  const [arrowImage, setArrowImage] = React.useState(true);
  const [isBottomModal, setBottomModal] = React.useState(false);
  const [radioChecked, setRadioChecked] = React.useState(groupData[0].groupNo);
  const [checkedGroupName, setCheckedGroupName] = React.useState(groupData[0].groupName);
  const [search, setSearch] = React.useState('');
  const [dataSource, setDataSource] = React.useState(groupData);


    const updateSearch = search => {
    
      const newData = groupData.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.groupName ? item.groupName.toUpperCase() : ''.toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataSource(newData);
      setSearch(search);
    }
  
    return(
        <>      
          <GroupSelect onPress={() => {
          setBottomModal(!isBottomModal);
          setArrowImage(false);
          }}>
              <NameText>PengSoo</NameText>
              <Image source={ arrowImage === true ? 
              require('../../../Assets/Icons/arrow_down.png') : require('../../../Assets/Icons/arrow_up.png') } 
              style={{width:15, height:15}}/>
          </GroupSelect>
          <Modal isVisible = {isBottomModal}
          style={styles.view}
          // swipeDirection='down'
          // onSwipeComplete={() => {setBottomModal(false)}}
          onBackdropPress={() => {setBottomModal(!isBottomModal); setArrowImage(true);}}>
            <View style={styles.modal}>
                <View style={styles.searchbar}>
                  <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme = {true}
                    clearIcon = {true}
                    searchIcon = {true}
                  />
                </View>
                <View style={{height:250, marginTop:20, marginLeft:10}}>
                    <FlatList 
                      data = {dataSource}
                      renderItem = {
                        (itemProps) => (
                          <Item {...itemProps} radioValue = {radioChecked}
                          onPress = {
                            () => {setRadioChecked(itemProps.item.groupNo);
                              setCheckedGroupName(itemProps.item.groupName);
                              //aync save (itemProps.item.groupNo);
                            console.log(itemProps.item.groupNo+"is selected!!!");}
                          }
                            />
                        )
                      }
                      keyExtractor={item => item.groupNo}
                    />
                </View>
                  <Button bordered style={{width:300, justifyContent:'center', marginLeft:50}}
                    onPress={() => {alert(checkedGroupName)}}>
                    <Text>그룹 생성하기</Text>
                    {
                      /**
                       * Todo:
                       * 생성한 그룹에 관한 페이지로 다시 랜더링
                       * ->  context api 사용!!
                       * header의 select group 이름 바꾸기
                       */
                    }
                  </Button>
            </View>
          </Modal>
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
    bottom:0,
    height:450,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    width:screenWidth - 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft:20
  },
  searchbar:{
    marginLeft:20,
    marginTop:40,
    width:screenWidth -60,
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  groupText :{
    fontSize:20, 
    color:'black' },
});

export default SelectGroup;