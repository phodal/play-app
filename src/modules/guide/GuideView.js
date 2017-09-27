import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const color = () => Math.floor(255 * Math.random());

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class GuideView extends Component {
  static displayName = 'GuideView';

  static navigationOptions = {
    title: '分类',
    tabBarIcon: (props) => {
      return (
        <Icon name='explore' size={24} color={props.tintColor}/>
      );
    }
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      background: `rgba(${color()},${color()},${color()}, 1)`
    };
  }

  open = () => {
    this.props.navigate({routeName: 'Guide'});
  };

  render() {
    const buttonText = 'Open in Stack Navigator';
    return (
            <View style={[styles.container, {backgroundColor: this.state.background}]}>
                <Button color='#ee7f06' title={buttonText} onPress={this.open}/>
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

export default GuideView;
