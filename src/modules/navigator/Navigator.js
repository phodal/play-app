import {Platform} from 'react-native';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';

import HomeViewContainer from '../home/HomeViewContainer';
import PlayViewContainer from '../play/PlayViewContainer';
import GuideViewContainer from '../guide/GuideViewContainer';
import AboutViewContainer from '../about/AboutViewContainer';
import PlayDetailViewContainer from '../play/PlayDetailViewContainer';
import GuideDetailContainer from '../guide/GuideDetailContainer';

const headerColor = '#384452';
const activeColor = '#fff';

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
  headerTitleStyle: {color: activeColor},
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  Play: {screen: PlayViewContainer},
  Guide: {screen: GuideViewContainer},
  About: {screen: AboutViewContainer},
  PlayDetailView: {
    // path: 'play/:slug',
    screen: PlayDetailViewContainer
  },
  GuideDetailView: {
    // path: 'play/:slug',
    screen: GuideDetailContainer
  }
}, {
  navigationOptions: {
    headerTintColor: '#51c4fe',
    headerBackTitle: '后退',
    headerStyle: {backgroundColor: 'white'},
    headerTitleStyle: {alignSelf: 'center'}
  }
});

export default AppNavigator;
