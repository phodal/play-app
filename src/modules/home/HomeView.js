import React, {Component, PropTypes} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';

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
      nextLink: null,
      noMore: false,
      isRefreshing: false,
      loadingMore: false,
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

  renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  fetchData() {
    this.setState({
      loading: true
    });
    axios.get('https://www.wandianshenme.com/api/play/')
      .then(response => {
        this.setState({
          data: response.data,
          plays: response.data.results,
          nextLink: response.data.next ? response.data.next : null,
          isRefreshing: false,
          loading: false
        });
      });
  }

  onEndReached() {
    if (!this.state.nextLink) {
      this.setState({
        noMore: true
      });
      return;
    }
    this.setState({
      loadingMore: true
    });

    axios.get(this.state.nextLink)
      .then(response => {
        this.setState({
          data: response.data,
          plays: this.state.plays.concat(response.data.results),
          nextLink: response.data.next ? response.data.next : null,
          loadingMore: false,
          loading: false
        });
      });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    return (
      <TouchableHighlight
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
                    uri: 'https://www.wandianshenme.com/static/media/' + item.featured_image
                  }}
                />
                : <Text>{ item.featured_image }</Text>
              }
            </View>

            <Text style={{marginBottom: 10}}>
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

    return (
      <View style={styles.container}>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.plays}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.onEndReached.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default HomeView;
