import React, {PropTypes, Component} from 'react';
import {
    Button,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const color = () => Math.floor(255 * Math.random());

class AboutView extends Component {
  static displayName = 'AboutView';

  static navigationOptions = {
    title: '关于',
    tabBarIcon: (props) => (
                <Icon name='info' size={24} color={props.tintColor} />
            ),
    header: {
      tintColor: 'white',
      style: {
        backgroundColor: '#39babd'
      }
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
    this.props.navigate({routeName: 'About'});
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

export default AboutView;
