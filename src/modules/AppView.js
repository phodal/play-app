import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Linking, Platform, View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';

import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  handleOpenURL = (event) => {
    if (!event) {
      snapshotUtil.resetSnapshot()
        .then(snapshot => {
          const {dispatch} = this.props;

          if (snapshot) {
            dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
          } else {
            dispatch(SessionStateActions.initializeSessionState());
          }

          store.subscribe(() => {
            snapshotUtil.saveSnapshot(store.getState());
          });
        });
    }
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  render() {
    if (!__DEV__ && !this.props.isReady) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='#384452' barStyle='light-content'/>
        <NavigatorViewContainer/>
        {__DEV__ && <DeveloperMenu/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
