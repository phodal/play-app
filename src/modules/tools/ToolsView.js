import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  ScrollView, ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';

const baseUrl = '../cheatsheets/pinout/';

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
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(ARDUINO_PINOUT)
    };

    this.renderRow = this.renderRow.bind(this);
  }

  static navigationOptions = {
    title: '工具',
    tabBarIcon: (props) => (
      <Icon name='build' size={24} color={props.tintColor} />
    )
  };

  renderRow(rowData, sectionID) {
    const {navigate} = this.props.navigation;
    return (
      <ListItem
        leftIcon={{name: 'developer-board'}}
        key={sectionID}
        title={rowData.name}
        onPress={() => {
          navigate('PDFView', baseUrl + rowData.file);
        }}
      />
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container} >
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />
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
