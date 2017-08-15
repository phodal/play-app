import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import HomeViewContainer from '../counter/HomeViewContainer';
import PlayViewContainer from '../play/PlayViewContainer';
import GuideViewContainer from '../guide/GuideViewContainer';
import AboutViewContainer from '../about/AboutViewContainer';

const headerColor = '#384452';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator(
  {
    Counter: {screen: HomeViewContainer},
    Color: {screen: PlayViewContainer},
    Guide: {screen: GuideViewContainer},
    About: {screen: AboutViewContainer}
  },
  {
    tabBarOptions: {
      ...Platform.select({
        android: {
          activeTintColor: activeColor,
          indicatorStyle: {backgroundColor: activeColor},
          style: {backgroundColor: headerColor}
        }
      })
    }
  });

MainScreenNavigator.navigationOptions = {
  title: '一起玩点什么'
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  Color: {screen: PlayViewContainer},
  Guide: {screen: GuideViewContainer},
  About: {screen: AboutViewContainer}
});

export default AppNavigator;
