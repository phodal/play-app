import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
            <View style={styles.container}>
              <Text>联系我们</Text>
              <Text>版本</Text>
              <Text>评价</Text>
              <Text>反馈</Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AboutView;
