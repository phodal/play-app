import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';

import Pdf from 'react-native-pdf';

class PDFView extends Component {
  static displayName = 'PlayDetailView';

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`
  });

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageCount: 1
    };
    this.pdf = null;
  }

  render() {
    const {params} = this.props.navigation.state;
    let source = require('../cheatsheets/pinout/esp8266_devkit.pdf');  // ios only
    if (!__DEV__) {
      source = {uri: params.uri};
    }

    return (
      <View style={styles.container}>
        <Pdf ref={(pdf) => {this.pdf = pdf;}}
             source={source}
             page={1}
             scale={1}
             horizontal={false}
             onLoadComplete={(pageCount) => {
               this.setState({pageCount: pageCount});
               console.log(`total page count: ${pageCount}`);
             }}
             onPageChanged={(page) => {
               this.setState({page: page});
               console.log(`current page: ${page}`);
             }}
             onError={(error) => {
               console.log(error);
             }}
             style={styles.pdf}/>
        <View style={styles.pageTag}>
          <Text style={{color: '#384452'}}>{this.state.page} / {this.state.pageCount}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    width: Dimensions.get('window').width
  },
  pageTag: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    right: 0,
    bottom: 0
  }
});

export default PDFView;
