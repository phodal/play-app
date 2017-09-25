import React, {Component, PropTypes} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
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
      data: []
    };
  }

  componentWillMount() {
    axios.get('https://www.wandianshenme.com/api/play/')
      .then(response => {
        this.setState({
          nextLink: response.next ? response.next : null,
          data: response.data,
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
    axios.get(this.state.nextLink)
      .then(response => {
        this.setState({
          nextLink: response.next ? response.next : null,
          data: this.state.data.concat(response.data),
          loading: false
        });
      });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    console.log('https://www.wandianshenme.com/static/media/' + item.featured_image);
    return (
      <TouchableHighlight
        key={this.keyExtractor}>
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
            data={this.state.data.results}
            renderItem={this.renderList}
            onEndReached={this.onEndReached.bind(this)}
          />

          { this.state.noMore
            ? <View><Text>已无更多内容</Text></View> : <View />
          }
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
