import React, {Component} from 'React';
import {StatusBar} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

import ComingScene from './ComingScene';
import TheaterScene from './TheaterScene';
import TabbarItem from "../widgets/TabbarItem";
import DetailScene from './DetailScene';
import color from '../common/color';

class RootScene extends Component {
  constructor() {
    super()
    StatusBar.setBarStyle('light-content')
  }
  
  render() {
    return <Navigator/>
  }
}

const Tab = TabNavigator(
  {
    Theater: {
      screen: TheaterScene,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '正在热映',
        tabBarIcon: ({focused, tintColor}) => (
          <TabbarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/playing.png')}
            selectedImage={require('../image/playing-active.png')}
          />
        )
      }),
      
    },
    Coming: {
      screen: ComingScene,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '即将上映',
        tabBarIcon: ({focused, tintColor}) => (
          <TabbarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../image/coming.png')}
            selectedImage={require('../image/coming-active.png')}
          />
        )
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: color.themeColor,
      inactiveTintColor: '#888888',
      style: {backgroundColor: '#ffffff'}
    }
  }
)

const Navigator = StackNavigator(
  {
    Tab: {screen: Tab},
    Detail: {screen: DetailScene}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#ffffff',
      headerStyle: {backgroundColor: color.themeColor},
      showIcon: true
    }
  }
)

export default RootScene;