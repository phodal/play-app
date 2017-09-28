import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import moment from 'moment';
require('moment/locale/zh-cn');


import normalize from '../../wdui/helpers/normalizeText';
import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';
import {URL} from '../../constants';
import {
  Divider,
  Button
} from 'react-native-elements';

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
    navigation: React.PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: false,
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

            <Text style={{marginBottom: 10, fontSize: normalize(12), lineHeight: normalize(18)}}>
              作者：{ item.user }
            </Text>
            <Text style={{marginBottom: 10, fontSize: normalize(12), lineHeight: normalize(18)}}>
              时间：{ moment(item.updated).fromNow() }
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
    const {navigate} = this.props.navigation;

    let topElems = [];
    for (let i = 0; i < top.length; i++) {
      let topData = top[i];
      let topElem = (<View key={i} style={styles.slide1}>
        <TouchableHighlight onPress={() => navigate('PlayDetailView', topData)}>
          <ImageBackground
            style={{width: deviceWidth, height: deviceWidth * 0.6}}
            source={{
              uri: URL.IMAGE_BASE + topData.featured_image
            }}
          >
            <View style={styles.textView}>
              <View style={styles.textbg}>
                <Text style={styles.text}>{topData.title}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableHighlight>
      </View>);

      topElems.push(topElem);
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <Swiper style={styles.wrapper} showsButtons={false} height={deviceWidth * 0.6}>
            {topElems}
          </Swiper>
        </View>
        <View style={styles.newTitle}>
          <Divider />
          <Text>最受欢迎玩法</Text>
          <Divider />
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
        <View style={styles.newTitle}>
          <Divider />
          <Text>最新玩法</Text>
          <Divider />
        </View>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data.new}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
          />
        </View>
        <View class={styles.findMore}>
          <Button backgroundColor={'#00b3fe'} class={styles.moreButton} title={'查看更多'} onPress={() => navigate('Play')} />
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
  },
  newTitle: {
    paddingTop: 40,
    paddingBottom: 0,
    paddingLeft: 20,
    alignItems: 'flex-start'
  },
  findMore: {
    marginTop: 15,
    marginBottom: 15
  },
  moreButton: {
    marginTop: 15,
    marginBottom: 15
  }
});

export default HomeView;
