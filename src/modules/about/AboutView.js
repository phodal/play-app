import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
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
        <Icon name='info' size={24} color={props.tintColor} />
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
          <ListItem title={'联系我们'}/>
          <ListItem title={'当前版本'} rightTitle={DeviceInfo.getVersion()}/>
        </List>
      </View>
    );
  }
}

export default AboutView;
