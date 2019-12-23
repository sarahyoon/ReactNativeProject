import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MyAlbum from './screens/Album/MyAlbum';
import MyBox from './screens/Box/MyBox';

const AlbumTab = createStackNavigator(
  {
    MyAlbum: {
              screen: MyAlbum,
              navigationOptions:{
                header:null,
              }
            }
  }
);

const BoxTab = createStackNavigator(
  {
    MyBox: MyBox,
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