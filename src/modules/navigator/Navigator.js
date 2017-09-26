import {Platform} from 'react-native';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';

import HomeViewContainer from '../home/HomeViewContainer';
import PlayViewContainer from '../play/PlayViewContainer';
import GuideViewContainer from '../guide/GuideViewContainer';
import AboutViewContainer from '../about/AboutViewContainer';

const headerColor = '#384452';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator(
  {
    Home: {screen: HomeViewContainer},
    Play: {screen: PlayViewContainer},
    Guide: {screen: GuideViewContainer},
    About: {screen: AboutViewContainer}
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
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
  title: '玩点什么'
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  Play: {screen: PlayViewContainer},
  Guide: {screen: GuideViewContainer},
  About: {screen: AboutViewContainer}
});

export default AppNavigator;
