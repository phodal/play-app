import {NavigationActions} from 'react-navigation';
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

let tracker = new GoogleAnalyticsTracker('UA-103160487-3');

const screenTracking = () => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = action.routeName;
  if (currentScreen) {
    tracker.trackScreenView(currentScreen);
  }

  const result = next(action);
  return result;
};

export default screenTracking;
