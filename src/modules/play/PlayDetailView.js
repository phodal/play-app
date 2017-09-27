import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';

import {URL} from '../../constants';
import MarkdownHelper from '../../utils/MarkdownHelper';

const deviceWidth = Dimensions.get('window').width;

class PlayDetailView extends Component {
  static displayName = 'PlayDetailView';

  static navigationOptions = ({navigation}) => ({
    title: `玩法: ${navigation.state.params.title}`
  });

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {params} = this.props.navigation.state;
    const htmlContent = MarkdownHelper.convert(params.content);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingBottom: 15}}>
            { params.featured_image
              ? <FastImage
                style={{width: deviceWidth, height: (deviceWidth) * 0.4}}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: URL.IMAGE_BASE + params.featured_image
                }}
              />
              : <View />
            }
          </View>
          <Text style={styles.title}>{ params.title }</Text>
          <HTMLView
            value={htmlContent}
            style={styles.htmlView}
            stylesheet={styles}
            addLineBreaks={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  pre: {
    padding: 5,
    backgroundColor: '#f8f8f8'
  },
  code: {
    color: '#444',
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  title: {
    color: '#384452',
    alignItems: 'center',
    fontSize: 24,
    padding: 10
  },
  htmlView: {
    padding: 10
  },
  a: {
    color: '#1abc9c'
  },
  li: {
    color: '#384452'
  },
  p: {
    color: '#384452',
    marginTop: 0,
    marginBottom: 0
  },
  h1: {fontWeight: '500', fontSize: 24, color: '#384452'},
  h2: {fontWeight: '500', fontSize: 20, color: '#384452'},
  h3: {fontWeight: '500', fontSize: 18, color: '#384452'},
  h4: {fontWeight: '500', fontSize: 16, color: '#384452'},
  h5: {fontWeight: '500', fontSize: 14, color: '#384452'},
  h6: {fontWeight: '500', fontSize: 12, color: '#384452'}
});

export default PlayDetailView;
