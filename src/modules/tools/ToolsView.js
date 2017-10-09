import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';

const ARDUINO_PINOUT = [{
  name: 'Arduino Uno',
  file: 'arduino-uno.pdf'
}, {
  name: 'Arduino Due',
  file: 'arduino-due.pdf'
}, {
  name: 'Arduino Esplora',
  file: 'arduino-esplora.pdf'
}, {
  name: 'Arduino Leonardo',
  file: 'arduino-leonardo.pdf'
}, {
  name: 'Arduino Mega',
  file: 'arduino-mega.pdf'
}, {
  name: 'Arduino Micro',
  file: 'arduino-micro.pdf'
}, {
  name: 'Arduino Mini',
  file: 'arduino-mini.pdf'
}, {
  name: 'Arduino Uno',
  file: 'arduino-pro-mini.pdf'
}];

class ToolsView extends Component {
  static displayName = 'ToolsView';

  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  };

  static navigationOptions = {
    title: '工具',
    tabBarIcon: (props) => (
      <Icon name='build' size={24} color={props.tintColor} />
    )
  };

  render() {
    const {navigate} = this.props.navigation;
    const baseUrl = '../cheatsheets/pinout/';

    return (
      <ScrollView style={styles.container} >
        <List>
          <ListItem title={'Arduino UNO'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Due'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Esplora'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Leonardo'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Mega'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Micro'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Mini'} leftIcon={{name: 'developer-board'}} />
          <ListItem title={'Arduino Pro Mini'} leftIcon={{name: 'developer-board'}} />
        </List>
        <List>
          <ListItem
            title={'ESP8266'}
            leftIcon={{name: 'developer-board'}}
            onPress={() => {
              navigate('PDFView', baseUrl + 'esp8266_devkit.pdf');
            }}
          />
        </List>
        <List>
          <ListItem
            title={'Raspberry Pi 2 Model B'}
            leftIcon={{name: 'developer-board'}}
            onPress={() => {
              navigate('PDFView', baseUrl + 'raspberry-rpi2-model-b.pdf');
            }}
          />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ToolsView;
