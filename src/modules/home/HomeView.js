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

    let categoriesElement = [];
    if (item.categories && item.categories.length > 0) {
      let categories = item.categories;
      for (let i = 0; i < categories.length; i++) {
        categoriesElement.push(
          <View key={i} style={styles.category}>
            <Text style={styles.categoryText}>{categories[i].title}</Text>
          </View>
        );
      }
    }

    return (
      <TouchableHighlight
        onPress={() => navigate('PlayDetailView', item)}
        key={this.keyExtractor}>
        <View style={styles.card}>
          <View style={styles.article}>
            <View>
              <Text style={styles.author}>
                {item.user} 发表于 {moment(item.updated).fromNow()}
              </Text>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.description}>
                {item.description}
              </Text>
            </View>
            <View style={styles.categories}>
              {categoriesElement}
            </View>
          </View>
          <View>
            {item.featured_image
              ? <FastImage
                style={{width: deviceWidth * 0.3, height: deviceWidth * 0.3}}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: URL.IMAGE_BASE + item.featured_image
                }}
              />
              : <View/>
            }
          </View>
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
          <Text style={{paddingLeft: 15}}>最受欢迎玩法</Text>
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
          <Text style={{paddingLeft: 15}}>最新玩法</Text>
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
          <Button backgroundColor={'#00b3fe'}
                  class={styles.moreButton}
                  title={'查看更多'}
                  onPress={() => navigate('Play')} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    color: '#384452',
    padding: 10,
    fontSize: normalize(16),
    textAlign: 'center'
  },
  newTitle: {
    marginTop: 25,
    paddingBottom: 0,
    marginLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: '#51c4fe',
    alignItems: 'flex-start'
  },
  findMore: {
    marginTop: 15,
    marginBottom: 15
  },
  moreButton: {
    marginTop: 15,
    marginBottom: 15
  },
  card: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row'
  },
  article: {
    flex: 1
  },
  author: {
    color: '#384452',
    marginBottom: 10,
    fontSize: normalize(12),
    lineHeight: normalize(18)
  },
  description: {
    color: '#384452',
    marginBottom: 5,
    paddingRight: 5,
    fontSize: normalize(11),
    lineHeight: normalize(18)
  },
  category: {
    borderColor: '#51c4fe'
  },
  categoryText: {
    color: '#444',
    paddingRight: 5,
    fontSize: normalize(10),
    lineHeight: normalize(11)
  },
  categories: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default HomeView;
