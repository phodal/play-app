import {NavigationActions} from 'react-navigation';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker('blabla');

const screenTracking = ({getState}) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

// gets the current screen from navigation state
  function getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route);
    }
    return route.routeName;
  }

  const currentScreen = getCurrentRouteName(getState().navigation);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().navigation);
  console.log(nextScreen);
  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    tracker.trackScreenView(nextScreen);
  }
  return result;
};

export default screenTracking;
