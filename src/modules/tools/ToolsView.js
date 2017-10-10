import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';

const baseUrl = 'bundle-assets://cheatsheets/';

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

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const {navigate} = navigation;
    return {
      title: '工具',
      tabBarIcon: (props) => (
        <Icon name='build' size={24} color={props.tintColor} />
      ),
      headerRight: (
        <Icon name='bluetooth'
              size={24}
              color={'#fff'}
              onPress={() => {
                navigate('BleView');
              }}
        />
      )
    };
  };

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item, index}) => {
    const {navigate} = this.props.navigation;
    return (
      <ListItem
        leftIcon={{name: 'developer-board'}}
        key={index}
        title={item.name}
        onPress={() => {
          navigate('PDFView', {
            title: item.name,
            uri: baseUrl + 'pinout/' + item.file
          });
        }}
      />
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container} >
        <List>
          <ListItem
            title={'Arduino 编程速查表'}
            leftIcon={{name: 'developer-board'}}
            onPress={() => {
              navigate('PDFView', {
                title: 'Arduino 编程速查表',
                uri: baseUrl + 'programming/arduino-cheat-sheet.pdf'
              });
            }}
          />
        </List>
        <List>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={ARDUINO_PINOUT}
            renderItem={this.renderList}
          />
        </List>
        <List>
          <ListItem
            title={'ESP8266'}
            leftIcon={{name: 'developer-board'}}
            onPress={() => {
              navigate('PDFView', {
                title: 'ESP8266',
                uri: baseUrl + 'pinout/esp8266_devkit.pdf'
              });
            }}
          />
        </List>
        <List>
          <ListItem
            title={'Raspberry Pi 2 Model B'}
            leftIcon={{name: 'developer-board'}}
            onPress={() => {
              navigate('PDFView', {
                title: 'Raspberry Pi',
                uri: baseUrl + 'pinout/raspberry-rpi2-model-b.pdf'
              });
            }}
          />
        </List>
        <View style={{marginBottom: 20}}/>
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
