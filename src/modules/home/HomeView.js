import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';


import normalize from '../../wdui/helpers/normalizeText';
import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';
import {URL} from '../../constants';

const deviceWidth = Dimensions.get('window').width;

class HomeView extends Component {
  static displayName = 'HomeView';

  static navigationOptions = {
    header: <View style={{
      backgroundColor: '#384452',
      flexDirection: 'row',
      height: Platform.OS === 'ios' ? 64 : 56
    }}
     />,
    title: '首页推荐',
    tabBarIcon: (props) => (
        <Icon name='home' size={24} color={props.tintColor} />
      )
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: true,
      isRefreshing: false,
      data: []
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.fetchData();
  }

  fetchData() {
    this.setState({
      loading: true
    });
    axios.get(URL.HOME)
      .then(response => {
        this.setState({
          data: response.data,
          isRefreshing: false,
          loading: false
        });
      });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    const {navigate} = this.props.navigation;

    return (
      <TouchableHighlight
        onPress={() => navigate('PlayDetailView', item)}
        key={this.keyExtractor}>
        <View>
          <Card
            title={ item.title }>
            <View style={{paddingBottom: 15}}>
              { item.featured_image
                ? <FastImage
                  style={{width: deviceWidth - 60, height: (deviceWidth - 60) * 0.4}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: URL.IMAGE_BASE + item.featured_image
                  }}
                />
                : <View />
              }
            </View>

            <Text style={{marginBottom: 10, fontSize: normalize(13), lineHeight: normalize(18)}}>
              { item.description }
            </Text>
          </Card>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading text={'数据加载中'} />;
    }
    const {top} = this.state.data;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Swiper style={styles.wrapper} showsButtons={false} height={deviceWidth * 0.6}>
            <View style={styles.slide1}>
              <Image
                style={{width: deviceWidth, height: deviceWidth * 0.6}}
                source={{
                  uri: URL.IMAGE_BASE + top[0].featured_image
                }}
              >
                <View style={styles.textView}>
                  <View style={styles.textbg}>
                    <Text style={styles.text}>{top[0].title}</Text>
                  </View>
                </View>
              </Image>
            </View>
            <View style={styles.slide2}>
              <Image
                style={{width: deviceWidth, height: deviceWidth * 0.6}}
                source={{
                  uri: URL.IMAGE_BASE + top[1].featured_image
                }}
              >
                <View style={styles.textView}>
                  <View style={styles.textbg}>
                    <Text style={styles.text}>{top[1].title}</Text>
                  </View>
                </View>
              </Image>
            </View>
            <View style={styles.slide3}>
              <Image
                style={{width: deviceWidth, height: deviceWidth * 0.6}}
                source={{
                  uri: URL.IMAGE_BASE + top[2].featured_image
                }}
              >
                <View style={styles.textView}>
                  <View style={styles.textbg}>
                    <Text style={styles.text}>{top[2].title}</Text>
                  </View>
                </View>
              </Image>
            </View>
          </Swiper>
        </View>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data.hot}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    height: deviceWidth * 0.4
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textbg: {
    width: deviceWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  text: {
    color: '#4d4d4d',
    padding: 10,
    fontSize: normalize(18),
    textAlign: 'center'
  }
});

export default HomeView;
