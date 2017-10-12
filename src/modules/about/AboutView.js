import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';

class AboutView extends Component {
  static displayName = 'AboutView';

  static navigationOptions = {
    title: '关于',
    tabBarIcon: (props) => (
      <Icon name='info' size={24} color={props.tintColor}/>
    )
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  open = () => {
    this.props.navigate({routeName: 'About'});
  };

  render() {
    return (
      <View>
        <List>
          <ListItem
            title={'访问网站'}
            onPress={() => {
              Linking.openURL('https://www.wandianshenme.com/');
            }}
          />
          <ListItem
            title={'联系我们'}
            onPress={() => {
              Linking.openURL('https://www.wandianshenme.com/contact/');
            }}
          />
          <ListItem
            title={'GitHub 访问'}
            onPress={() => {
              Linking.openURL('https://github.com/phodal/play-app');
            }}
          />
          <ListItem title={'当前版本'} rightTitle={DeviceInfo.getVersion()}/>
        </List>
      </View>
    );
  }
}

export default AboutView;
