import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PDFView from '../../wdui/PDFView';

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
      <View style={styles.container} >
        <PDFView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default ToolsView;
