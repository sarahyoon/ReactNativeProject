import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MyAlbum from './screens/Album/MyAlbum';
import Pick from './screens/Box/Pick';
import MyBox from './screens/Box/MyBox';

import AlbumAllList from './screens/Album/AlbumAllList';
import AlbumDetail from './screens/Album/AlbumDetail';

const AlbumTab = createStackNavigator(
  {
    MyAlbum: {
              screen: MyAlbum,
              navigationOptions:{
                header:null,
              }
            },
    AlbumAllList : {
              screen: AlbumAllList
    } ,
    AlbumDetail: {
              screen: AlbumDetail
    }
  }
);

const BoxTab = createStackNavigator(
  {
    Pick:  {
      screen: Pick,
      navigationOptions:{
        header:null,
      }
    },

    MyBox:{
      screen:MyBox,
      navigationOptions:{
        header:null,
      }
    }
  }
);

const BottomTabs = createBottomTabNavigator(
  {
    Album: AlbumTab,
    Box : BoxTab,
  },
  {
    initialRouteName:'Album',
  }
)

const Container = createAppContainer(BottomTabs);

const App = () => {
  return(
    <>
    <Container/>
    </>
  );
};

export default App;