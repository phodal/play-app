import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PDFView from '../../wdui/PDFView';
import PhotoView from 'react-native-photo-view';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
        <PhotoView
          source={require('../../pdf-assets/esp8266_esp_201_module_pinout_diagram_cheat_sheet.png')}
          minimumZoomScale={1}
          maximumZoomScale={4}
          androidScaleType='center'
          onLoad={() => console.log('Image loaded!')}
          style={{width: deviceWidth, height: deviceHeight}} />
        {/*<PDFView />*/}
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
