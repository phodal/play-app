import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

import normalize from '../../wdui/helpers/normalizeText';
import Loading from '../../wdui/loading/Loading';
import {URL} from '../../constants';
import {Button} from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;

class HomeView extends Component {
  static displayName = 'HomeView';

  static navigationOptions = ({navigation}) => {
    const {navigate} = navigation;
    return {
      title: '首页推荐',
      tabBarIcon: (props) => (
        <Icon name='home' size={24} color={props.tintColor}/>
      ),
      headerRight: (
        <Icon name='search'
              size={24}
              color={'#fff'}
              style={{paddingRight: 10}}
              onPress={() => {
                navigate('BleView');
              }}
        />
      )
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: true,
      isRefreshing: false,
      isLoadingCategory: false,
      categories: [],
      data: []
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  };

  navigate = (url) => {
    const {navigate} = this.props.navigation;
    if (!url) {
      return;
    }

    const route = url.replace(/.*?:\/\//g, '');
    let routeArray = route.split('/');
    if (routeArray.length <= 1) {
      return;
    }
    const routeName = routeArray[1];

    console.log(routeArray.length);
    if (routeArray.length === 3 && routeName === 'play') {
      navigate('Play');
    } else if (routeArray.length === 4) {
      const slug = routeArray[2];
      navigate('PlayDetailView', {slug});
    }
  };

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.fetchData();
  }

  fetchData() {
    axios.get(URL.HOME)
      .then(response => {
        this.setState({
          data: response.data,
          isRefreshing: false,
          loading: false
        });
      });

    axios.get(URL.CATEGORY)
      .then(response => {
        this.setState({
          categories: response.data.results,
          isLoadingCategory: false
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
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
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

  getColor(index) {
    if (index > 17) {
      return '#fff';
    }

    const COLORS = [
      '#99b433',      // Light Green
      '#00a300',      // Green
      '#1e7145',      // Dark Green
      '#ff0097',      // Mangenta
      '#9f00a7',      // Light Purple
      '#7e3878',      // Purple
      '#603cba',      // Dark Purple
      '#1d1d1d',      // Darken
      '#00aba9',      // Team
      '#c1bbb2',      // Light Blue
      '#2d89ef',      // Blue
      '#2b5797',      // Dark Blue
      '#ffc40d',      // Yellow
      '#e3a21a',      // Orange
      '#da532c',      // Dark Orange
      '#ee1111',      // Red
      '#b91d47'      // Dark Red
    ];
    return COLORS[index];
  }

  getIcon(index) {
    if (index > 17) {
      return 'build';
    }

    const ICONS = [
      'memory',      // Light Green
      'cast',      // Green
      'bluetooth',      // Dark Green
      'computer',      // Mangenta
      'device-hub',      // Light Purple
      'devices-other',      // Purple
      'dock',      // Dark Purple
      'gamepad',      // Darken
      'headset',      // Team
      'keyboard',      // Light Blue
      'keyboard-voice',      // Blue
      'router',      // Dark Blue
      'scanner',      // Yellow
      'watch',      // Orange
      'speaker',      // Dark Orange
      'toys',      // Red
      'build'      // Dark Red
    ];
    return ICONS[index];
  }

  renderCategoryItem({item, index}) {
    const {navigate} = this.props.navigation;

    return (
      <TouchableHighlight
        style={[styles.slide, {backgroundColor: this.getColor(index)}]}
        onPress={() => navigate('GuideDetailView', item)}
        key={this.keyExtractor}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View>
            <Icon name={this.getIcon(index)} size={normalize(12)} color={'#fff'} />
          </View>
          <View>
            <Text style={styles.slideTitle}>{ item.title }</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.loading || this.state.isLoadingCategory) {
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
        <View style={styles.carouselView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.categories}
            renderItem={this.renderCategoryItem.bind(this)}
            keyExtractor={this.keyExtractor}
          />
        </View>
        <View>
          <View style={styles.newTitle}>
            <Text style={{paddingLeft: 15}}>最受欢迎玩法</Text>
          </View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data.hot}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
          />
        </View>
        <View>
          <View style={styles.newTitle}>
            <Text style={{paddingLeft: 15}}>最新玩法</Text>
          </View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data.new}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.6}
            hasParallaxImages={true}
            onRefresh={this.onRefresh.bind(this)}
          />
        </View>
        <View>
          <View style={styles.findMore}>
            <Button backgroundColor={'#00b3fe'}
                    raised
                    title={'查看更多'}
                    onPress={() => navigate('Play')} />
          </View>
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
  carouselView: {
    marginTop: 15
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    height: deviceWidth * 0.1,
    width: deviceWidth * 0.25,
    borderRadius: 4,
    backgroundColor: 'rgba(56, 68, 62, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideTitle: {
    fontSize: normalize(10),
    paddingLeft: 6,
    justifyContent: 'center',
    color: '#fff'
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
    borderLeftWidth: 3,
    borderLeftColor: '#e71d32',
    alignItems: 'flex-start'
  },
  findMore: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15
  },
  card: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row'
  },
  article: {
    flex: 1
  },
  author: {
    color: '#384452',
    fontSize: normalize(12),
    lineHeight: normalize(18)
  },
  title: {
    paddingTop: 5,
    paddingBottom: 5
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
