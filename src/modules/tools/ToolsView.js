import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, ListItem} from 'react-native-elements';

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
          <ListItem title={'ESP8266'} leftIcon={{name: 'developer-board'}} />
        </List>
        <List>
          <ListItem title={'Raspberry Pi 2 Model B'} leftIcon={{name: 'developer-board'}} />
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
