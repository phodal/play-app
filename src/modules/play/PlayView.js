import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import normalize from '../../wdui/helpers/normalizeText';
import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';
import {URL} from '../../constants';

const deviceWidth = Dimensions.get('window').width;

class PlayView extends Component {
  static displayName = 'PlayView';

  static navigationOptions = {
    title: '玩法',
    tabBarIcon: (props) => (
      <Icon name='color-lens' size={24} color={props.tintColor} />
    )
  };

  static propTypes = {
    url: PropTypes.string,
    navigate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      nextLink: null,
      noMore: false,
      isRefreshing: false,
      loadingMore: false,
      data: [],
      url: this.props.url || URL.PLAY
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
          paddingVertical: 20
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  fetchData() {
    axios.get(this.state.url)
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

  renderListEmptyComponent() {
    if (!this.state.data) {
      return (<View />);
    }

    return (
      <View style={styles.emptyComponent}>
        <Icon name={'help-outline'} style={styles.errorIcon} />
        <Text style={styles.errorText}>找不到相关的玩法</Text>
      </View>
    );
  }
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
            ListEmptyComponent={this.renderListEmptyComponent.bind(this)}
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
  },
  emptyComponent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorIcon: {
    color: '#384452',
    paddingTop: normalize(50),
    fontSize: normalize(50)
  },
  errorText: {
    paddingTop: normalize(18),
    color: '#384452',
    fontSize: normalize(18)
  }
});

export default PlayView;
