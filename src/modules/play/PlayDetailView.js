import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

import {URL} from '../../constants';
import MarkdownHelper from '../../utils/MarkdownHelper';
import NativeHtmlViewRender from '../../wdui/NativeHtmlViewRender';
import Divider from '../../wdui/Divider';
import Loading from '../../wdui/loading/Loading';
import normalize from '../../wdui/helpers/normalizeText';

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
    this.state = {
      loading: false,
      data: props.navigation.state && props.navigation.state.params ? props.navigation.state.params : null
    };
  }

  componentWillMount() {
    console.log(this.props);
    if (this.props.navigation.state.params && this.props.navigation.state.params.slug) {
      let slug = this.props.navigation.state.params.slug;
      axios.get(URL.PLAY + '?slug=' + slug)
        .then(response => {
          this.setState({
            data: response.data.results[0],
            loading: false
          });
        });
    }
  }

  render() {
    let data = this.state.data;
    if (!data && !data.content) {
      return <Loading text={'数据加载中'} />;
    }
    const htmlContent = MarkdownHelper.convert(data.content, {width: deviceWidth});

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingBottom: 15}}>
            { data.featured_image
              ? <FastImage
                style={{width: deviceWidth, height: (deviceWidth) * 0.4}}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: URL.IMAGE_BASE + data.featured_image
                }}
              />
              : <View />
            }
          </View>
          <Text style={styles.title}>{ data.title }</Text>
          <View style={styles.authorInfo}>
            <Text style={styles.author}>{ data.user }</Text>
          </View>
          <Divider />
          <NativeHtmlViewRender
            html={htmlContent}
          />
          <Divider />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#384452',
    alignItems: 'center',
    fontSize: normalize(18),
    padding: 10,
    backgroundColor: '#fff'
  },
  authorInfo: {
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  author: {
    color: '#384452',
    fontSize: normalize(12),
    padding: 5,
    backgroundColor: '#fff'
  }
});

export default PlayDetailView;
